module.exports = function() {

    const isDateInPast = date => {
        const today = new Date();
        today.setHours(0,0,0,0)
        return date.getTime() >= today.getTime();
    }

    const isValidEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    return {
        isDateInPast,
        isValidEmail
    }
}();