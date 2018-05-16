const router = require('express').Router();

router.use((req, res, next) => {
    // token validation, logging, etc. here
    
    if (!req.body.data) {
        res.sendStatus(400);
    }
    else next();
});

router.use('/event', require('./event/event'));

router.use('*', (req, res, next) => {
	res.sendStatus(400);
})

module.exports = router;