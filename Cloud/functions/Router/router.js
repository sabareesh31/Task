require('dotenv').config()
const express = require('express');
const router = express.Router();
const { authmiddleware, user, CheckPermission, CheckDataPermission } = require('../Middleware/Middleware')
const signup = require('../controller/login')
const { dashboard, userid } = require('../controller/db')
const { contractorGetAll, contractorId, contractorAdd, contractorUpdate, contractorDelete } = require('../Contractor/contractor')


router.get('/dashboard', authmiddleware, user, CheckPermission(process.env.ADMIN_EMPLOYEE_ONLY), dashboard);
router.get('/dashboard/:id', authmiddleware, user, CheckPermission(process.env.ADMIN_EMPLOYEE_ONLY), CheckDataPermission, dashboard);
router.get('/user/:id', authmiddleware, user, userid, CheckPermission);


//using axios and joi validate
router.get('/contractor', contractorGetAll)
router.get('/contractor/:id', contractorId)
router.post('/contractor', contractorAdd)
router.put('/contractor/:id', contractorUpdate)
router.delete('/contractor/:id', contractorDelete)

router.post('/signup', signup);
// router.post('/signin',signin)

module.exports = router;