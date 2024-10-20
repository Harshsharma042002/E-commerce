const express = require('express');
const { Register, Login, LogOut } = require('../controllers/usercontroller');

const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/logout').post(LogOut);

module.exports = router; 
