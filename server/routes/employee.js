const express = require('express')
const { getAllEmployee, createEmployee, editEmployee, deleteEmployee } = require('../controllers/employee')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.get('/getEmployee',auth,getAllEmployee)
router.post('/createEmployee',createEmployee)
router.post('/editEmployee',auth,editEmployee)
router.delete('/deleteEmployee/:id',auth,deleteEmployee)

module.exports = router