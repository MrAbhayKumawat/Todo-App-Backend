import mongoose from 'mongoose';

const smsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: true,
  },
  sender: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('SMS', smsSchema);