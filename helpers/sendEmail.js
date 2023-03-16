const sgMail = require('@sendgrid/mail')

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async (data) => {
    const email = {...data, from: "ihor.kozhemyakin@gmail.com"}
    await sgMail.send(email);
}
  
  module.exports = sendEmail;