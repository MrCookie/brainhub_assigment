const router = require('express').Router();

router.use((req, res, next) => {
    if (!req.body.data) {
        res.sendStatus(400);
    }
    else next();
});

router.use('/event', require('./event/event'));

module.exports = router;