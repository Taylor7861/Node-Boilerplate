




require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('./routes/AuthRoutes');
const bodyParser = require('body-parser');
const path = require('path')
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.static('public'))




const PORT = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes/AuthRoutes');

app.use(cors());
app.use(express.json());
    app.use(express.urlencoded({extended: true}))

  app.use('/' , router)
  app.use('/login',router)
  app.use('/Register',router)

  


// Connect to MongoDB using Mongoose
mongoose.set({strictQuery: false}).connect(process.env.DB )
  .then(() => console.log('DB connection successful!'))
  .catch((error) => console.error('DB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

