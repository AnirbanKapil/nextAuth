import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"

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
           let transport = nodemailer.createTransport({
           host: "sandbox.smtp.mailtrap.io",
           port: 2525,
           auth: {
           user: "5eece8ee443810",//❎
           pass: "********7c3f"//❎
           }
          });    

          const mailOption = {
            from: "heros@ai.com", // sender address
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Rese your password"}
            or copy and paste the link below in your browser.<br/>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
          }
          
          const mailResponse = await transport.sendMail(mailOption)
          return mailResponse  

       
    }catch (error : any) {
      throw new Error(error.message)}
}