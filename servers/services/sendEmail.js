const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: data.email, // list of receivers
    subject: "Email verification", // Subject line
    html: `${data.OTP} is your one time passcode(OTP) to reset your account password`, // html body
  });

  return info.messageId;
};

module.exports = sendEmail;
