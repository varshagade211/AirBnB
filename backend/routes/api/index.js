const router =require('express').Router()
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const SpotsRouter = require('./spot.js')
const {restoreUser} = require('../../utils/auth.js')

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', SpotsRouter);


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });






module.exports = router;
