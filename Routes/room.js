let express = require('express');
const {createRoom, getRooms} = require('../Controllers/room');
const isAuthenticated = require('../Middlewares/isAuthenticated');

let router = express.Router()
router.post('/create-room', isAuthenticated,createRoom);
router.get('/get-rooms',getRooms);


module.exports = router;