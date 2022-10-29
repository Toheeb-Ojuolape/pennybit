const { createTransport } = require("nodemailer");
const fs = require("fs");
const ApiError = require("../helpers/ApiError");
const { promisify } = require("util");
const handlebars = require("handlebars");
const path = require("path")

require("dotenv").config()


const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const sendEmail = async (to, template, subject, data) => {
    const readFile = promisify(fs.readFile);
    const root = path.dirname(require.main.filename)
    let html = await readFile(root + template, 'utf8');
    let handled_template = handlebars.compile(html);
    let htmlToSend = handled_template(data);
    const mailData = {
        from: `${process.env.EMAIL_SENDER} <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: htmlToSend,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            throw new ApiError(500, error)
        }
        console.log("email sent")
    });
}

module.exports = sendEmail