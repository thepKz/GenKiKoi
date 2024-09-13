import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './databases/database';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const connectWithRetry = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log('Failed to connect to MongoDB, retrying in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

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

export default app;