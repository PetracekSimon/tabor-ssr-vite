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
        html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333333;">
            <tr>
                <td align="center" style="padding: 20px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 20px 0;">
                        <tr>
                            <td align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="600"
                                    style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 4px;">
                                    <tr>
                                        <td style="padding: 40px 40px 30px 40px;">
                                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                                                Vážení rodiče,<br><br>
                                                děkujeme Vám za vyplnění přihlášky pro vaše dítě.
                                            </p>

                                            <p style="font-size: 16px; line-height: 1.5; color: #555555;">
                                                Dovolujeme si Vás upozornit, že v tuto chvíli je <strong>přihláška
                                                považována za nezávaznou</strong>. K jejímu potvrzení
                                                dojde až v momentě, kdy Vás budeme kontaktovat s vyjádřením o schválení
                                                registrace a volné kapacitě termínu.
                                            </p>

                                            <p style="font-size: 16px; line-height: 1.5; margin-top: 25px;">
                                                O dalším postupu a podkladech k platbě Vás budeme informovat v
                                                nejbližším možném termínu po zpracování Vašich údajů, zpravidla do
                                                jednoho týdne.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0 40px 40px 40px;">
                                            <p style="font-size: 16px; margin: 0;">
                                                S pozdravem,<br><br>
                                                <strong>Tábor Kamenná</strong><br>
                                                <span style="font-size: 14px; color: #777777;">Tento e-mail je generován
                                                    automaticky, prosíme, neodpovídejte na něj přímo. Pokud máte nějaké dotazy volejte <a href="tel:+420776648406">+420 776 648 406</a></span>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
        `
    }

    transporter.sendMail(mailOptions, (err: Error | null, info) => {
        if (err) {
            return console.error(err);
        }
        console.log("Email sent: ", info);
    })
}

export default sendEmail;