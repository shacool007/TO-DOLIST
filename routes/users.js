const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const postController = require('../controllers/posts_controller');

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-in',passport.checkReAuth,usersController.signIn);
router.get('/sign-up',passport.checkReAuth,usersController.signUp);
router.get('/sign-out',usersController.signOut)
router.post('/create',usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);
module.exports = router;