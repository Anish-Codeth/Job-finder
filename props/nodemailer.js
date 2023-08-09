var nodemailer = require('nodemailer');
require('dotenv').config()

const emailVerification=async (gmail_id,code)=>{
return new Promise(async (resolve,reject)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: process.env.GMAIL,
  to: gmail_id,
  subject: 'Verification code',
  html: `<h1>${code}</h1>`  //write here javascript code for verification
};

try{
await transporter.sendMail(mailOptions)
resolve('email sent')
}
catch(err)
{
reject("Email couln't be sent")
}
})
}
module.exports=emailVerification