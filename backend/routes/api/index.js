const router =require('express').Router()
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const spotsRouter = require('./spot.js')
const reviewsRouter = require('./review.js')
const {restoreUser} = require('../../utils/auth.js')

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });






module.exports = router;
