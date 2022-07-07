const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth ,restoreUser } = require('../../utils/auth');
const { User ,Spot} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//sign up credential check validator

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a valid email.'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('firstName')
    .isString()
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('lastName')
    .isString()
    .withMessage('Last Name is required'),


  handleValidationErrors
];

// Sign up
router.post('/signup',validateSignup, async (req, res, next) => {
  const { email, password,firstName,lastName } = req.body;
  const isExists = await User.findOne({where:{email:email}})
  if(req.user) {
    const err = new Error("Already user logged in")
    err.statusCode = 403
    return next(err)
  }
  if(isExists){
    const err = new Error("User already exists")
    err.statusCode = 403
    err.errors = {
      email: "User with that email already exists"
    }
    return next(err)
  }

  const user = await User.signup({ firstName,lastName,email,password });

  const token = await setTokenCookie(res, user);
  user.dataValues.token = token

  return res.json(
    user
  );
});

router.get('/current', requireAuth, async (req,res)=>{
    const user = await User.findByPk(req.user.id)
    if(user){
      res.status(200).json(user)
    }
})

module.exports = router;
