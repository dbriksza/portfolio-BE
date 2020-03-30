require("dotenv").config();

const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");

const express = require("express");
const server = express();

server.use(bodyParser.json());

server.post("/send", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: req.body.email,
    subject: "Resume- Daniel K. Briksza",
    text: "Thank you for your interest! I hope to hear from you soon!",
    attachments: [
      {
        filename: "Resume.pdf",
        path: "./Resume.pdf",
        contentType: "application/pdf"
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.status(500).json(error);
      console.log(error);
    } else {
      res.status(200).json(info.response);
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = server;
