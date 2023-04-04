const express = require('express');
const cors = require('cors');
const app = express();
const userRouter =  require('./Routes/user.js');
const roomRouter =  require('./Routes/room.js');
const { jsonResponce } = require('./Utils/responce.js');
const NewErrorHandler = require('./Utils/NewErrorHandler');
const { ErrorController } = require('./Controllers/ErrorController.js');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json({
    limit: '50mb'
}));

app.use(cors({
    origin: ['http://localhost:3000'],
    
    credentials: true,
}))
app.use('/api' ,userRouter);
app.use('/api' ,roomRouter);
app.all('*', (req, res , next)=>next(new NewErrorHandler('Route Not Found' , 404)))
app.use(ErrorController)


module.exports = app ;