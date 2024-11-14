import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server";

export const sendEmail = async ({email,emailType,userId} : any) => {
    
      try {

      const hashedToken = await bcryptjs.hash(userId.toString(),10) 
  
      if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId , {
          verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 3600000
        })
      }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId , {
          forgotPasswordToken : hashedToken ,  forgotPasswordTokenExpiry : Date.now() + 3600000
      })     
    }
           const transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
           user: "140d45df931d5f",
           pass: "********6a7c"
           }
           });

          const mailOption = {
            from: 'chat@ai.com', // sender address
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken} ">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Rese your password"}
            or copy and paste the link below in your browser.<br/>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }
          
         try {
           const mailResponse = await transport.sendMail(mailOption)
           return mailResponse 
         } catch (error) {
           console.log("error msg :", error) 
         } 

       
    }catch (error : any) {
      return  NextResponse.json({error : error.message})}
}