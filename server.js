
// It should always be on first 
process.on("uncaughtException", (err) => {
   console.log("Shutting down the server due to Uncaught Exception 🔥");
   console.log(err)
  
     process.exit(1);
 });
 const dotenv = require("dotenv");
 const cloudinary = require('cloudinary').v2;
 dotenv.config({ path: "./Config/config.env" });
 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
 const app = require("./app");
const { connectMongoDb } = require("./database");
const PORT = process.env.PORT || 5700;
const httpServer = require('http').createServer(app);
const server = httpServer.listen(PORT, () => {
  console.log("Server Listening on " + PORT);
});


const io = require('socket.io')(httpServer, {
  cors : {
    origin:'http://localhost:3000',
    methods:['GET','POST']
  }
});
io.on('connection', (socket)=>{
  console.log('New Connection:', socket.id); 

})


connectMongoDb();



 
process.on("unhandledRejection", (err) => {
   console.log("Shutting down the server due to Unhandled Rejection 🔥");
   console.log(err)
 
   server.close(() => {
     process.exit(1);
   });
 });
