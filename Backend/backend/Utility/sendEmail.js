import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js'

dotenv.config();

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    },
})

export const sendMail = async({subject,html})=>{
    try {
        
        // const allEmails = await User.find({}, "email"); 

        // const emailList = allEmails.map(user => user.email);

        // console.log(emailList); 

        const mailOptions = {
            from:process.env.SMTP_USER,
            to:"datardimohsinali@gmail.com",
            subject,
            html,
        }

        const info = await transporter.sendMail(mailOptions);
         return { success: true, message: "Email sent successfully" };
    } catch (error) {
        return { success: false, message: "Failed to send email" };
    }
}