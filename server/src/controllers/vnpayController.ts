import crypto from 'crypto';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import qs from 'qs';
import Payment from '../models/Payment';
dotenv.config();

const tmnCode = process.env.TMN_CODE!;
const vnp_HashSecret = process.env.vnp_HashSecret!;
const vnpUrl = process.env.VNP_URL!;
const returnUrl = process.env.RETURN_URL!;

function sortObject(obj: Record<string, any>) {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    const value = obj[key];
    sorted[key] = encodeURIComponent(String(value)).replace(/%20/g, "+");
  }
  return sorted;
}
/**
 * @swagger
 * tags:
 *   name: VNPay
 *   description: VNPay payment operations
 */

/**
 * @swagger
 * /api/vnpay/create_payment_url:
 *   post:
 *     summary: Create a VNPay payment URL
 *     tags: [VNPay]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - orderDescription
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to be paid
 *               orderDescription:
 *                 type: string
 *                 description: Description of the order
 *               orderType:
 *                 type: string
 *                 description: Type of the order
 *                 default: 'other'
 *               language:
 *                 type: string
 *                 description: Language for the payment page
 *                 default: 'vn'
 *           example:
 *             amount: 100000
 *             orderDescription: "Thanh toán dịch vụ khám bệnh cho cá Koi"
 *             orderType: "billpayment"
 *             language: "vn"
 *     responses:
 *       200:
 *         description: Successfully created payment URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 paymentUrl:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

export const createPayment = async (req: Request, res: Response) => {
  console.log('Received VNPAY payment request:', req.body);

  // Sử dụng thời gian hiện tại
  const date = new Date();

  // Kiểm tra nếu thời gian hệ thống nằm trong tương lai, điều chỉnh lại
  const now = Date.now();
  if (date.getTime() > now) {
    date.setTime(now);
  }

  const createDate = dateFormat(date);

  // Thời gian hết hạn (tăng thêm 15 phút)
  const expireDate = dateFormat(new Date(date.getTime() + 15 * 60 * 1000));

  const orderId = date.getTime().toString();

  console.log('Generated orderId:', orderId);

  const amount = req.body.amount;
  const orderInfo = req.body.orderDescription;
  const orderType = req.body.orderType || 'other';
  const locale = req.body.language || 'vn';
  const currCode = 'VND';

  const clientIp =
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.ip ||
    '';

  // Đảm bảo địa chỉ IP hợp lệ
  const ipAddr = clientIp === '::1' ? '127.0.0.1' : clientIp.toString();

  const vnp_Params: Record<string, string> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: (amount * 100).toString(),
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expireDate, // Thêm tham số vnp_ExpireDate
  };

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;

  // Create a new Payment document
  const newPayment = new Payment({
    orderId: orderId,
    amount: amount,
    orderInfo: orderInfo,
    orderType: orderType,
    transactionStatus: 'pending',
    paymentMethod: 'vnpay',
  });

  try {
    await newPayment.save();
    console.log('Payment document created:', newPayment);

    const fullUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false });
    console.log('Generated VNPAY URL:', fullUrl);
    res.json({ status: 200, paymentUrl: fullUrl });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ status: 500, message: 'Error creating payment' });
  }
};

function dateFormat(date: Date) {
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);
  return `${year}${month}${day}${hour}${minute}${second}`;
}

/**
 * @swagger
 * /api/vnpay/vnpay_return:
 *   get:
 *     summary: Handle VNPay payment return
 *     tags: [VNPay]
 *     parameters:
 *       - in: query
 *         name: vnp_TxnRef
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction reference
 *       - in: query
 *         name: vnp_ResponseCode
 *         schema:
 *           type: string
 *         required: true
 *         description: Response code from VNPay
 *       - in: query
 *         name: vnp_SecureHash
 *         schema:
 *           type: string
 *         required: true
 *         description: Secure hash for verification
 *     responses:
 *       200:
 *         description: Successfully processed payment return
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Response code
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
export const vnpayReturn = async (req: Request, res: Response) => {
  console.log('Received VNPAY return request:', req.query);

  let vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  console.log('Calculated secure hash:', signed);
  console.log('Received secure hash:', secureHash);

  if (secureHash === signed) {
    console.log('Secure hash verification successful');
    // Check payment status
    const orderId = vnp_Params['vnp_TxnRef'];
    const rspCode = vnp_Params['vnp_ResponseCode'];
    console.log('Payment result:', { orderId, rspCode });

    // Cập nhật trạng thái thanh toán trong MongoDB
    const payment = await Payment.findOne({ orderId });
    if (payment) {
      payment.transactionNo = vnp_Params['vnp_TransactionNo'] as string;
      payment.transactionStatus = rspCode === '00' ? 'success' : 'failed';
      await payment.save();
      console.log('Payment updated:', payment);
    } else {
      console.log('Payment not found for orderId:', orderId);
    }

    // Perform actions based on the payment result
    res.json({ code: vnp_Params['vnp_ResponseCode'] });
  } else {
    console.log('Secure hash verification failed');
    res.json({ code: '97' });
  }
};
