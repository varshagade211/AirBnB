const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//login credential check middleware
const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check("email")
    .isEmail()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

//login
router.post('/login',validateLogin, async(req,res,next) => {
    const {email, password} = req.body

    const user = await User.login({email, password})
    if (!user) {
        const err = new Error('Invalid credentials');
        err.statusCode = 401;
        err.errors = ['Invalid credentials']
        return next(err);
    }
    let token = await setTokenCookie(res, user)
    user.dataValues.token = token

    return res.json(
      user
    )
})

//logout
router.delete('/logout',(req, res, next) => {
      if(!req.user) {
        const err = new Error("User is not logged in")
        err.statusCode = 403

        return next(err)
      }
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
router.get('/',restoreUser,(req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );



module.exports = router;
