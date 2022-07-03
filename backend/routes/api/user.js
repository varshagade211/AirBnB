const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth ,restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//sign up credential check validator

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('userName')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('userName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up
router.post('/',validateSignup, async (req, res) => {
      const { email, password, userName } = req.body;
      const user = await User.signup({ email, userName, password });

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
  );
router.get('/current', restoreUser, async(req,res) => {
  const { user } = req
  const { token } = req.cookies
  res.json({...user.toSafeObject(),token})
})
module.exports = router;
