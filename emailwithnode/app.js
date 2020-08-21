const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'ahanda205@gmail.com',
  from: 'ahanda206@hotmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);