const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  // You can perform any validation logic here before saving to the database
  try {
    if (!this.username || !this.email || !this.password) {
      throw new Error('Missing required fields');
    }

    // Additional validation logic if needed

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
