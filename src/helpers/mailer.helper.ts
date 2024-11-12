import nodemailer from "nodemailer";

export const sendEmail = async ({email,emaiType,userId} : any) => {
 
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          })

          const mailOption = {
            from: "heros@ai.com", // sender address
            to: email,
            subject: emaiType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: "<b>Hello world?</b>",
          }
          
          const mailResponse = await transporter.sendMail(mailOption)
          return mailResponse  

    } catch (error : any) {
        throw new Error(error.message)
    }
}