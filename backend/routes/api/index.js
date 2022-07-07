const router =require('express').Router()
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const spotsRouter = require('./spot.js')
const reviewsRouter = require('./review.js')
const bookingsRouter = require('./booking.js')
const imagesRouter = require('./image.js')
const {restoreUser} = require('../../utils/auth.js')

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);

module.exports = router;
