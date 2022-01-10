require('dotenv').config();

const nodemailer = require('nodemailer');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  //   res.send('Hello World!');
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const userRegistrationEmail = async (firtsname, email) => {
    // send mail with defined transport object
    await mailTransporter.sendMail({
      from: `"The Resealer" <${process.env.MAIL}>`, // sender address
      to: email,
      subject: `Welcome ${firtsname} to The Resealer`, // Subject line
      text: 'Welcome to The Resealer and thanks for your registration!', // plain text body
    });

    mailTransporter.sendMail(function (err, data) {
      if (err) {
        console.log('Error Occurs', err.message);
      } else {
        console.log('Email sent successfully');
      }
    });
  };
  userRegistrationEmail('emeline', 'emeline.garo@gmail.com');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
