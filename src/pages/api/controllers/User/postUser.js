import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postUser = async (req,res) =>{
    try {
        const data = req.body
        const { password,confirmPassword } = data;
    
        const userFind = await prisma.user.findUnique({
          where: { email: data.email },
        });

        if (!password || !confirmPassword) return res.json(mensagess.errors.onePassword)
         if (password !== confirmPassword) return res.json(mensagess.errors.diffPasword) 
        if (userFind) return res.json(mensagess.errors.verifyEmail);
        if (!process.env.JWT_SECRET) return res.json('JWT secret is not defined');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        };
        
        const createUser = await prisma.user.create({ data: newUser });
        
        const { password: _unused, ...userWithoutPassword } = createUser;
        
        const token = jwt.sign({ user: createUser }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.setHeader("Set-Cookie", `auth_cookies=${token}; Secure; SameSite=Strict; Max-Age=86400; Path=/`);
    
        return res.status(200).json({
          user: userWithoutPassword,
          message: mensagess.success.postUser,
        });
      } catch (error) {
        throw new Error('Failed to create User');
      }
}