require('dotenv').config();

const nodemailer = require('nodemailer');

const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

app.use(express.json(), cors());

app.post('/', function (req, res) {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

  const userRegistrationEmail = async (email, firtsname) => {
    await mailTransporter.sendMail({
      from: `"The Resealer" <${process.env.MAIL}>`,
      to: email,
      subject: `Welcome ${firtsname} to The Resealer`,
      text: 'Welcome to The Resealer and thanks for your registration!',
    });

    mailTransporter.sendMail(function (err, data) {
      if (err) {
        console.log('Error Occurs', err.message);
      } else {
        console.log('Email sent successfully');
      }
    });
  };

  userRegistrationEmail(req.body.email, req.body.firstname);
});

app.get('/', (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
