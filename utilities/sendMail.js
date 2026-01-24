const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "1001096@daffodil.ac",
    pass: "oaie vvoe ltra qkio",
  },
});


// send mail function

const sendMail = async (to, subject, secret, template) => {
const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: to,
    subject: subject,
    html: template(secret), // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}

// export sendMail function
module.exports = sendMail;