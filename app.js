
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/AuthRoutes');
const ratingRouter = require('./routes/ratingRoutes')
const path = require('path')
const app = express();
app.use(express.static('public'))


const PORT = process.env.PORT || 3000;
const cors = require('cors');
 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

  app.use('/' , authRouter);
  app.use('/login',authRouter);
  app.use('/Register',authRouter);
  app.use('/api',ratingRouter);
  app.use('/api',ratingRouter);






// Connect to MongoDB using Mongoose
mongoose.set({strictQuery: false}).connect(process.env.DB )
  .then(() => console.log('DB connection successful!'))
  .catch((error) => console.error('DB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

