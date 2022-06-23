const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: 'inadinad88@yahoo.com',
    pass: 'lehifhdvfwtraaye'
  }
})


module.exports = transporter