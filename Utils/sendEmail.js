const nodemailer = require('nodemailer');
const { catchAsyncErrors } = require('./catchAsyncErrors');
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   auth: {
//     // type :"login",
//     // user: process.env.EMAIL,
//     // pass: process.env.PASSWORD,
//     type: "OAUTH2",
//     "client_id": "796197656974-b62g90ogb4vuo135fs4leqmor74tsh0f.apps.googleusercontent.com",
//     "project_id": "coders-souls",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_secret": "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",
//     "redirect_uris": ["http://localhost"],
//     expires: 3599
//   },
// });

module.exports  = async function (email,subject='No Subject' , text='' , html =''){

      try {
        const transporter =await  nodemailer.createTransport({
          host:'smtp.gmail.com',
          secure:false,
          service: 'gmail',
          port:587,
          auth: {
              user:process.env.EMAIL,
              pass:process.env.PASSWORD
          }
        });  
        
        const res  = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to:email, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
          })
          console.log('Emailsent')
          console.log(res)
          return res;
      }catch (err){
        console.log('Email not sent')
        console.log(err)
        return err;

      }


}