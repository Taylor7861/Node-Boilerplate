const AuthConroller = require('../controller/AuthConroller');
const express = require('express')
const router = express.Router()

router.post('/Register',AuthConroller.RegisterUser);
router.post('/Login',AuthConroller.userLogin);
// router.get('/', (req,res)=> res.sendFile('/view/partials/home.html'))

module.exports = router;