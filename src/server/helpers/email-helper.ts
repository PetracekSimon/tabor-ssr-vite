import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASWD,
    },
});


const sendEmail = (recipient: string = "simonpetracekk@gmail.com", childFullName: string, applicationBuffer: unknown) => {

    const mailOptions = {
        from: "prihlasky@stanovytabor.cz",
        to: recipient,
        subject: `Stanový tábor Kamenná | Přihláška - ${childFullName}`,
        attachments: [{
            filename: `Stanový tábor Kamenná | Přihláška - ${childFullName}.pdf`,
            content: Buffer.from(applicationBuffer as Uint8Array)
        }],
        html: `<div>TODO: napast vlastní HTML</div>`
    }

    transporter.sendMail(mailOptions, (err: Error | null, info) => {
        if (err) {
            return console.error(err);
        }
        console.log("Email sent: ", info);
    })
}

export default sendEmail;