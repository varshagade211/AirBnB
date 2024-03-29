const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config');
const{User} = require('../db/models')

const{secret , expiresIn} = jwtConfig;


//sends a JWT Cookie
const setTokenCookie = (res,user) => {
    //create token
    const token = jwt.sign(
        {data:user.toSafeObject() },
        secret,
        {expiresIn: parseInt(expiresIn)}// 604,800 sec means 1 week
    )

    const isProduction = process.env.NODE_ENV === "production";

    //set the token cookie
    res.cookie('token', token,{
        maxAge:expiresIn * 1000, //max age in miliseconds
        httpOnly:true,
        secure:isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
 }




const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.scope('currentUser').findByPk(id);
      } catch (e) {
        res.clearCookie('token');
        return next(e);
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };

// If there is no current user, return an error
  const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = {message:'Please login'};
    err.status = 401;
    next(err)
    // _res.json({
    //   message: "Authentication required",
    //   statusCode: 401
    // })
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth };
