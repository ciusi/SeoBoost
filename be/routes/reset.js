const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Configura Nodemailer per usare Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// @route    POST /reset
// @desc     Request password reset
// @access   Public
router.post(
  '/',
  [check('email', 'Please include a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');

      const resetPasswordToken = jwt.sign(
        { resetToken },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Save the reset token to the user
      user.resetPasswordToken = resetToken;
      await user.save();

      // Create a reset URL
      const resetUrl = `http://localhost:5000/reset/${resetPasswordToken}`;

      // Send email
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               ${resetUrl}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ msg: 'Password reset email sent' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST /reset/:token
// @desc     Reset password
// @access   Public
router.post(
  '/:token',
  [
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
      const { resetToken } = decoded;

      const user = await User.findOne({ resetPasswordToken: resetToken });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid or expired token' }] });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Clear the reset token
      user.resetPasswordToken = undefined;
      await user.save();

      res.status(200).json({ msg: 'Password reset successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
