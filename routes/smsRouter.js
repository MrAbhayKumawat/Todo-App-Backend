import express from 'express';
import SMS from '../models/sms.js';

const router = express.Router();

// POST /api/sms - Store SMS data
router.post('/sms', async (req, res) => {
  try {
    const smsData = req.body;
console.log(smsData,"smsData");
console.log(req.body,"reqbody");

    if (!Array.isArray(smsData)) {
      return res.status(400).json({ success: false, message: 'Expected an array of SMS' });
    }

    const smsDocs = smsData.map((sms) => {
      if (!sms.id || !sms.sender || !sms.body) {
        throw new Error('Invalid SMS data: id, sender, and body are required');
      }
      return { id: sms.id, sender: sms.sender, body: sms.body };
    });

    await SMS.bulkWrite(
      smsDocs.map((sms) => ({
        updateOne: {
          filter: { id: sms.id },
          update: { $set: sms },
          upsert: true,
        },
      }))
    );

    res.json({ success: true, message: 'SMS data stored successfully' });
  } catch (error) {
    console.error('Error storing SMS:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;