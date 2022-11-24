const express = require('express');
const router = express.Router();
const {authmiddleware,user}=require('../Middleware/Middleware')
const signup=require('../controller/login')
const {dashboard,userid}=require('../controller/db')


router.get('/dashboard',authmiddleware,user,dashboard);
router.get('/user/:id',authmiddleware,user,userid);

router.post('/signup',signup);
// router.post('/signin',signin)

module.exports = router;