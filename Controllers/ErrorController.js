const NewErrorHandler = require("../Utils/NewErrorHandler");
const { jsonResponce } = require("../Utils/responce");

exports.ErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


  if (process.env.NODE_ENV === "production") {
    if(err.name === 'CastError') {
        const Error = {...err};
     err= new NewErrorHandler(`This Id is invalid ${Error.value} at ${err.path}`, 404);
         
    }
     if(err.message === 'jwt expired') {
        const Error = {...err};
     err= new NewErrorHandler(`Token Expired`, 401);
         
    } 
     if(err.name === 'ValidationError') {
        const Error = {...err};
        let erors = Object.values(Error).map((el=>el.message));
     err= new NewErrorHandler(`Invalid Input Data ${erors.join('. ')} at ${err.path}`, 404);
         
    }
    // For duplication of unique entries 
    if(err.code === 11000) {
      console.log('Gotten Error Code 11000')
      const Error = {...err};
      let value = Object.values(Error.keyValue)[0]
     err = new NewErrorHandler(`Already Exists :  ${value}`, 400);
       
  }
   
    if (err.isOperationalError) {
      jsonResponce(res, err.statusCode, false, {
        statusCode: err.statusCode,
        message: err.message,
      });
    } else {
      console.log("ERROR 🔥" + err);
      jsonResponce(res, err.statusCode, false, {
        statusCode: 500,
        message: "Something Went very Wrong ",
      });
    }
  } else if (process.env.NODE_ENV === "development") {
if(err.message === 'jwt expired'){
  jsonResponce(res, 401, false, {
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
}else{
  jsonResponce(res, err.statusCode, false, {
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
}
    
  }
};
