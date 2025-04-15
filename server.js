import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectToDb from './DB/DataBase.js';
import authRouter from './routes/authRouter.js';
import todosRouter from './routes/todosRouter.js';
import smsRouter from './routes/smsRouter.js';
import { UserAuthMiddleware } from './middleware/UserAuthMiddleware.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// DB Connection
ConnectToDb();
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
// Use Routes
app.use('/api', authRouter);
app.use('/api', todosRouter);
app.use('/api', smsRouter);

// Login endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate input
    if (!password) {
      return res.status(400).json({ message: 'All fields are required' });
    }


  

    // Create user
    const user = new User({
      email,
      username,
      password    });

    await user.save();


    res.status(201).json({

      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Port listen
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});