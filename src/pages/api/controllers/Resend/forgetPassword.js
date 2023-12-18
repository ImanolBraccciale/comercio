import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
import jwt from "jsonwebtoken";
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND);


export const forgetPassword = async (req, res) => {
    const userFind = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!userFind) return res.json(mensagess.errors.verifyEmail);
    
    if (!process.env.JWT_SECRET) return res.json('JWT secret is not defined');
    
    const TokenData = {
        email: userFind.email,
        id: userFind.ID_USER
    }
    const token = jwt.sign({ user: TokenData }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
  
    const forgetURL= `http://localhost:3000/changePassword?token=${token}`
   
    resend.emails.send({
        from: 'comercio@resend..com',
        to: userFind.email,
        subject: 'cambio de contraseña',
        html: `<a href=${forgetURL}>cambiar contraseña</a>`
      });
    return res.json({
        messages:mensagess.success.resendSuccess
    })
}