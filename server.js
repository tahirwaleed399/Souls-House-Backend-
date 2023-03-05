// It should always be on first 
process.on("uncaughtException", (err) => {
   console.log("Shutting down the server due to Uncaught Exception 🔥");
   console.log(err)
  
     process.exit(1);
 });
 const dotenv = require("dotenv");
 dotenv.config({ path: "./Config/config.env" });
 
 const app = require("./app");
const { connectMongoDb } = require("./database");
const PORT = process.env.PORT || 5700;



connectMongoDb();

const server = app.listen(PORT, () => {
   console.log("Server Listening on " + PORT);
 });



 
process.on("unhandledRejection", (err) => {
   console.log("Shutting down the server due to Unhandled Rejection 🔥");
   console.log(err)
 
   server.close(() => {
     process.exit(1);
   });
 });
