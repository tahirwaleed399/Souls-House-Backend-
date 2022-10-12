const express = require('express');
const app = express();
const sampleRouter =  require('./Routes/sample.js');
const { jsonResponce } = require('./Utils/responce.js');
const NewErrorHandler = require('./Utils/NewErrorHandler');
const { ErrorController } = require('./Controllers/ErrorController.js');
app.use(express.json());
app.use(sampleRouter);
app.all('*', (req, res , next)=>next(new NewErrorHandler('Route Not Found' , 404)))
app.use(ErrorController)


module.exports = app ;