const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config.js');


const { handleLogin, handleLogout ,check,isLoggedIn} = require("../controllers/auth.js")

router.post('/login', passport.authenticate("local", {}), handleLogin);
router.delete('/logout', handleLogout);
router.get('/isLoggedIn', isLoggedIn);
// router.get('/check',check);
module.exports = router;