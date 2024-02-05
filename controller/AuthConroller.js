const User = require('../model/UserSchema');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');



const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


exports.RegisterUser = async (req, res) => {
  try {

    await Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required().regex(/@google\.com$/),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }).validateAsync(req.body);

    const email = await User.findOne({ email: req.body.email });

    if (email) {
      return res.status(401).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)


    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });



    await newUser.save();

    const token = signToken(newUser._id);

    res.status(200).json({ message: 'User successfully created', token });


  } catch (error) {

    console.error(error);
    res.status(400).json({ error: 'Invalid input data' });
  }

}

exports.userLogin = async (req, res) => {
  try {
    // Validate request body using Joi
    await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validateAsync(req.body);

    // Find the user in the database 
    const user = await User.findOne({ email: req.body.email });

    if (!user) {  
      return res.status(401).json({ error: 'Invalid email' });
    }

    // Check if the provided password matches the user's password (replace with your actual password validation logic)
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    // const token = signToken(
    //   { userId: user._id, username: user.username, email: user.email },
    //   process.env.privateKey,
    //   { expiresIn: '1h' }
    // );



    const token = signToken(user._id);

    res.json({ message: 'Login successful', token });
    res.render('login')
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid input data' });
  }
};
