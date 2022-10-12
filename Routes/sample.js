let express = require('express');
const { getSample, createSample } = require('../Controllers/sample');
let router = express.Router()
router.get('/sample', getSample);
router.post('/sample', createSample);

module.exports = router;