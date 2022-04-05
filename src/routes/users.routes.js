// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Create user
// api/users/create
router.post('/create', 
    //fields validation
    [
        check('firstName', 'Name is required').not().isEmpty(),
        check('lastName', 'LastName is required').not().isEmpty(),
        check('username', 'userName is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6})
    ],
    userController.createUser
);

//User authentication
//api/users/Login
router.post('/Login', 
   userController.authUser
);

module.exports = router;