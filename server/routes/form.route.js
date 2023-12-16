const express=require('express')
const { createForm, deleteForm, updateForm } = require('../controllers/form.controller')

const router=express.Router()
router.post('/create',createForm)
router.delete('/delete/:id',deleteForm)
router.put('/update/:id',updateForm)

module.exports=router