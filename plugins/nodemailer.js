const nodemailer = require('nodemailer')

const sendConfirmationEmail = (user, password) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.dreamhost.com',
    // type: 'SMTP',
    port: 465,
    auth: {
      user: 'billing@ezeducate.co', // generated ethereal user
      pass: 'QwertyaWd34!', // generated ethereal password
    },
  })
  transporter.sendMail(
    {
      from: 'billing@ezeducate.co', // sender address
      to: user.email, // list of receivers
      subject: 'Welcome to EZ Education Platform', // Subject line
      text: `Hi ${user.name}! Welcome to EZ Education Platform`, // plain text body
      html: `<b>Welcome to EZ Education Platform</b> <br>
      <p>Your account : ${user.username} </p>
      <p>Here is your password: <b>${password}<b> </p>
      <br>
       Don't tell other the password`, // html body
    },
    (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
    }
  )
}

module.exports = {
  sendConfirmationEmail,
}
