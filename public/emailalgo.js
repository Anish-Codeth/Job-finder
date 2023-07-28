nodemailer=require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pas077bct006@wrc.edu.np',
      pass: 'codeth333@'
    }
  });

  var mailOptions = {
    from: 'pas077bct006@wrc.edu.np',
    to: 'sushantxgautam@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `sushant is a `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });