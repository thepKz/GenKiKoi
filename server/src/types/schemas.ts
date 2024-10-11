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
 *     LoginInput:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *           example: Customer_minthep26
 *         password:
 *           type: string
 *           example: Customer_minthep26
 *     RegisterInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/User'
 *         token:
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
 */