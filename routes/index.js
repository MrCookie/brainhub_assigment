const express = require('express');
const router = express.Router();
var path = require('path');

/* Load React App */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

module.exports = router;
