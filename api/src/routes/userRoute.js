const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser,getUserByEmail} = require('../controllers/userController')
const {validate} = require('../middlewares/checkValidate')
const {protect} = require("../middlewares/auth");

router.post('/',validate.validateRegisterUser(),registerUser)
router.post('/login',validate.validateLogin(),loginUser)
router.get('/me',getUser)
router.get('/:email',getUserByEmail)

module.exports = router