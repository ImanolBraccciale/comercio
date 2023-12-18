import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const changePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const token = req.headers.token 
    try { 
        if (!password || !confirmPassword) return res.status(400).json({ error: mensagess.errors.onePassword });
        if (!token)  return res.status(401).json({ error: mensagess.errors.notAutorished });
        if (!process.env.JWT_SECRET) return res.status(400).json("JWT secret is not defined");

    try {
        const isTokenValue= jwt.verify(token, process.env.JWT_SECRET) 
        const userEmail = isTokenValue.user.email;
     

        const userFind = await prisma.user.findFirst({
            where: { email: userEmail },
        });
        
        if (!userFind) return res.status(400).json({ error: mensagess.errors.verifyEmail });
        
        const hashedPassword = await bcrypt.hash(confirmPassword, 10);
        const update = await prisma.user.update({
            where: { id: userFind.id },
            data: { password: hashedPassword },
        });
        res.json({message:mensagess.success.chagePassword})
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    } } catch (error) {
        return res.status(500).json({ error: "Something went wrongx2" });    
    }
};