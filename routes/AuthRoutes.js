const AuthConroller = require('../controller/AuthConroller');
const express = require('express')
const router = express.Router()

router.post('/register',AuthConroller.RegisterUser);
router.post('/login', AuthConroller.userLogin);
// router.get('/', (req,res)=> res.sendFile('/view/partials/home.html'))

module.exports = router;