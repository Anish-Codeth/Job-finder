var nodemailer = require('nodemailer');


const emailVerification=async (gmail_id,code)=>{
return new Promise(async (resolve,reject)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pas077bct006@wrc.edu.np',
    pass: 'codeth333@'
  }
});

var mailOptions = {
  from: 'pas077bct006@wrc.edu.np',
  to: gmail_id,
  subject: 'Verification code',
  html: `<h1>code</h1>${code}`  //write here javascript code for verification
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