import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import connectDB from './databases/database';
import authRoutes from './routes/authRoutes';
import mailRoutes from './routes/mailRoutes';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const connectWithRetry = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to MongoDB. Error:', error);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/mail', mailRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('Chào mừng đến với GenKiKoi API!');
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to auth routes
app.use('/api/auth', limiter);

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;