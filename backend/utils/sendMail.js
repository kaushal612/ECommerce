const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_HOST,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: "kaushal2k01@gmail.com",
                pass: "6122001k",
            },
        });

        const mailOptions = {
            from: "kaushal2k01@gmail.com",
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
    }


catch (err) {
        console.log(err);
    }

}

module.exports = sendEmail;