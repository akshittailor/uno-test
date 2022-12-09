const express = require('express');
const { check } = require("express-validator");


const router = express.Router();
const signupUserV1 = require('../controller/signup-user-controller')
const loginUserV1 = require('../controller/login-user-controller');
const getLoggedInUserV1 = require('../controller/get-logged-in-user-controller')
const logoutV1 = require('../controller/logout-user-controller')
const getMyJokeControllerV1 = require('../controller/get-random-joke');
const authentication = require('../../../middleware/auth');
const validation = require('../../../middleware/validation');

const signUpCheck = [
  check('name','Name is required').isString(),
  check('email','Email required!').isEmail(),
  check('contactNo','Contact number is required!').isMobilePhone('en-IN'),
  check('password','Password is required!,Please enter strong password!').isStrongPassword(),
];

const loginCheck = [
  check('email','Email required!').isEmail(),
  check('password','Password is required!').notEmpty(),
];

router.post('/signup',validation(signUpCheck),signupUserV1);
router.post('/login',validation(loginCheck),loginUserV1);
router.get('/profile',authentication,getLoggedInUserV1);
router.get('/random-joke',authentication,getMyJokeControllerV1);
router.post('/logout',authentication,logoutV1);

module.exports = router