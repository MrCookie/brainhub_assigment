const express = require('express');
const router = express.Router();

// Models
const EventModel = require('../../models/event')

router.post('/', function (req, res, next) {

    let event = new EventModel();
    event.firstName = req.body.data.firstName;
    event.lastName = req.body.data.lastName;
    event.email = req.body.data.email;
    event.date = req.body.data.date;

    // save the event and validate
    event.save(err => {
        if (err) res.send(err);
        else res.send({
            'status': 'success'
        });
    });

});

module.exports = router;