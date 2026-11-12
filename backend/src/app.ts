import express from 'express';
import cors from 'cors';

// Routes
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/api/test', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;