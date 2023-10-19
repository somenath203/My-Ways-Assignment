const express = require('express');

const { loginUser, registerUser, userProfile } = require('./../controllers/userControllers.js');
const { auth } = require('../middlewares/isLoggedInMiddleware.js');


const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', auth, userProfile);


module.exports = router;