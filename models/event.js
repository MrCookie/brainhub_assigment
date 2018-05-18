const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { isDateInPast, isValidEmail } = require('../helpers/form-validation');

/**
 * Event Schema
 */

const EventSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    date: Date,
    createdAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

EventSchema.path('firstName').required(true, 'First name cannot be blank!');
EventSchema.path('lastName').required(true, 'Last name cannot be blank!');
EventSchema.path('email').required(true, 'Email address cannot be blank!');
EventSchema.path('date').required(true, 'Date cannot be blank!');

EventSchema.path('email').validate(isValidEmail, 'Email address is invalid!')
EventSchema.path('date').validate(isDateInPast, 'Date is invalid!')

module.exports = mongoose.model('events', EventSchema);