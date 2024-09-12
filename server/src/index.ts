import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './databases/database';
import authRoutes from './routes/authRoutes';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('Chào mừng đến với GenKiKoi API!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});