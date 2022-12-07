import nodemailer from 'nodemailer'
import 'dotenv'

export const sendEmail = async (email: string, subject: string, text: string) => {
    const trasporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    await trasporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        text: text
    })

    console.log("email send successfuly")
}