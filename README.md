# 🐟 GenKiKoi - Koi Fish Healthcare Management System

![GenKiKoi Banner](https://github.com/user-attachments/assets/4a848cf0-7e48-4eb6-8146-3a7475c217b9)

GenKiKoi is a comprehensive veterinary service management system specifically designed for Koi fish care. It provides online consultations, pond inspections, disease treatment, doctor-patient management, and service evaluations.

## ✨ Features

- 🏥 Online consultations and appointments
- 💧 Water quality testing and monitoring
- 👨‍⚕️ Professional veterinary care management
- 📊 Treatment history tracking
- 💳 Integrated payment system
- ⭐ Service feedback and ratings
- 📱 Responsive web design

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Ant Design
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Integration:** PayOS
- **Cloud Storage:** Firebase Storage
- **Email Service:** NodeMailer

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Git

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/thepKz/GenKiKoi.git
cd GenKiKoi
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Install admin dependencies
cd ../admin
npm install
```

3. Configure environment variables
```bash
# Copy example environment files
cp .env.example .env
cd client && cp .env.example .env
cd ../admin && cp .env.example .env
cd ../server && cp .env.example .env
```

4. Start the development servers
```bash
# Start all services
npm run dev

# Or start services individually
npm run client  # Start client
npm run server  # Start server
npm run admin   # Start admin panel
```

## 🔧 Environment Configuration

### Server (.env)
```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb+srv://

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
SECRET_KEY=your_jwt_secret_key


# Email Configuration
EMAIL_USER=your_email@gmail.com
MAIL_PASSWORD==your_email_app_password

# Payment Configuration
CLIENT_ID=your_payos_client_id
API_KEY=your_payos_api_key
CHECKSUM_KEY=your_payos_checksum_key
BASE_URL_CANCELLED_PAYMENT=http://localhost:5173/payment-cancel
BASE_URL_SUCCESS_PAYMENT=http://localhost:5173/payment-success
```

### Client (.env)
```env
VITE_BASE_apiKey=your_firebase_api_key
VITE_BASE_authDomain=your-app.firebaseapp.com
VITE_BASE_projectId=your-project-id
VITE_BASE_storageBucket=your-app.appspot.com
VITE_BASE_messagingSenderId=your_messaging_sender_id
VITE_BASE_appId=your_app_id
VITE_API_URL=http://localhost:5000
```

### Admin (.env)
```env

VITE_BASE_apiKey=your_firebase_api_key
VITE_BASE_authDomain=your-app.firebaseapp.com
VITE_BASE_projectId=your-project-id
VITE_BASE_storageBucket=your-app.appspot.com
VITE_BASE_messagingSenderId=your_messaging_sender_id
VITE_BASE_appId=your_app_id
VITE_API_URL=http://localhost:5000
```

## 📱 Interface Preview

Check out our beautiful interface designs:
[View Design Files](https://drive.google.com/drive/folders/1s_zN8NncwQv8-xQ_9Bj5p5ucGdRFEdVb?usp=sharing)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mai Tấn Thép** - *Team Leader, Backend & Frontend Developer* - [thepKz](https://github.com/thepkz)
- **Đỗ Quang Dũng** - *Backend & Frontend Developer* - [DoDung-BePresent](https://github.com/DoDung-BePresent)
- **Lê Thị Ánh Hồng** - *Frontend Developer* - [leahhong](https://github.com/leahhong)
- **Nguyễn Thị Hồng Hạnh** - *Backend Developer* - [troidatoi](https://github.com/troidatoi)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

## 📞 Contact

For any queries, please reach out to us at maitanthepmrthep@gmail.com

---
⭐ Star us on GitHub — it helps!

