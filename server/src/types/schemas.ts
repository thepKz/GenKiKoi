/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         appointmentId:
 *           type: string
 *         serviceName:
 *           type: string
 *         doctorFullName:
 *           type: string
 *         appointmentDate:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         notes:
 *           type: string
 *     AppointmentList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Appointment'
 *     Service:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         serviceName:
 *           type: string
 *         price:
 *           type: number
 *         availableAt:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *     DoctorSchedule:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         doctorId:
 *           type: string
 *         weekSchedule:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: number
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     startTime:
 *                       type: string
 *                     endTime:
 *                       type: string
 *     DoctorSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         specialization:
 *           type: string
 *         licenseNumber:
 *           type: string
 *         yearOfExperience:
 *           type: number
 *         movingService:
 *           type: boolean
 *         userId:
 *           type: string
 *         __v:
 *           type: number
 *         startDate:
 *           type: string
 *     Customer:
 *       type: object
 *       properties:
 *         userId:
 *           $ref: '#/components/schemas/User'
 *         city:
 *           type: string
 *         district:
 *           type: string
 *         ward:
 *           type: string
 *         detailAddress:
 *           type: string
 *     Bill:
 *       type: object
 *       properties:
 *         appointmentId:
 *           type: string
 *           description: ID of the appointment
 *         customerId:
 *           type: string
 *           description: ID of the customer
 *         doctorId:
 *           type: string
 *           description: ID of the doctor
 *         serviceId:
 *           type: string
 *           description: ID of the service
 *         paymentId:
 *           type: string
 *           description: ID of the payment
 *         appointmentDate:
 *           type: string
 *           format: date-time
 *           description: Date of the appointment
 *         servicePrice:
 *           type: number
 *           description: Price of the service
 *         medicinePrice:
 *           type: number
 *           description: Price of the medicine (optional)
 *         totalPrice:
 *           type: number
 *           description: Total price
 *         status:
 *           type: string
 *           enum: ["Đang xử lý", "Hoàn thành", "Lỗi thanh toán", "Hủy"]
 *           description: Status of the bill
 *         paymentMethod:
 *           type: string
 *           enum: ["vnpay"]
 *           description: Payment method
 *         doctorName:
 *           type: string
 *           description: Name of the doctor
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *         serviceName:
 *           type: string
 *           description: Name of the service
 *         typeOfConsulting:
 *           type: string
 *           description: Type of consulting
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     Payment:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           description: Unique order identifier
 *         amount:
 *           type: number
 *           description: Payment amount
 *         orderInfo:
 *           type: string
 *           description: Information about the order
 *         orderType:
 *           type: string
 *           description: Type of the order
 *         transactionNo:
 *           type: string
 *           description: Transaction number (optional)
 *         transactionStatus:
 *           type: string
 *           enum: ['pending', 'success', 'failed']
 *           description: Status of the transaction
 *         paymentMethod:
 *           type: string
 *           enum: ['vnpay']
 *           description: Payment method
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           description: Date of payment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *  Pond:
      type: object
      properties:
        customerId:
          type: string
        doctorId:
          type: string
        status:
          type: string
        images:
          type: array
          items:
            type: string
        ph:
          type: number
        ammoniaLevel:
          type: number
        nitrateLevel:
          type: number
        oxygenLevel:
          type: number
        waterTemperature:
          type: number
        cleanliness:
          type: string
        filtrationSystem:
          type: string
        pondSize:
          type: number
        notes:
          type: string
        diagnosis:
          type: string
        createdAt:
          type: string
          format: date-time

 */
