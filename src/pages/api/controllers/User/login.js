
import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    try {
      const data= req.body
      const userFind = await prisma.user.findUnique({
        where: { email: data.email },
      });
  
      if (!userFind) {
        throw new Error(mensagess.errors.verifyEmail);
      }
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined');
      }
  
      const isCorrect = await bcrypt.compare(
        data.password,
        userFind.password
      )
      if (!isCorrect) {
       
        return res.json({ message: mensagess.errors.incorrectPassword })
  
  
      }
  
      const { password: _unused, ...userWithoutPassword } = userFind;
  
      const token = jwt.sign({ user: userWithoutPassword }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      
      res.setHeader("Set-Cookie", `auth_cookies=${token}; Secure; SameSite=Strict; Max-Age=86400; Path=/`);
      return res.status(200).json({
        user: userWithoutPassword,
        message: mensagess.success.login,
      });
  
    } catch (error) {
      throw new Error('Failed to search all User');
    }
  
  }