const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.dreamhost.com',
  // type: 'SMTP',
  port: 465,
  auth: {
    user: 'billing@ezeducate.co', // generated ethereal user
    pass: 'QwertyaWd34!', // generated ethereal password
  },
})
const sendEmail = (options) => {
  transporter.sendMail(
    {
      from: 'billing@ezeducate.co', // sender address
      to: options.to, // list of receivers
      subject: options.subject, // Subject line
      text: options.text, // plain text body
      html: options.content, // html body
    },
    (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
    }
  )
}

module.exports = sendEmail
