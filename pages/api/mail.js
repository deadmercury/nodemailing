const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'yandex',
    host: 'smtp.yandex.ru',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
);

export default function handler(req, res) {
  const subject = `${req.body.name} <${req.body.email}>`;
  const body = req.body.message;
  const passphrase = req.body.passphrase;

  if (passphrase !== process.env.PASSPHRASE) {
    res.status(403).json({
      message: 'Passphrase Incorrect!',
      console: 'Invalid Passphrase! Forbidden',
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(502).json({ message: 'Something Went Wrong!' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Message Delivered Successfully!' });
    }
  });
}
