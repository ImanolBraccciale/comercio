import { mensagess } from "../../utils/messages";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import messages from "@/app/utils/messagess";
import { prisma } from "../../utils";
import { redirect } from "next/dist/server/api-utils";
export const changePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    try {
        
        
        if (!password || !confirmPassword) {
            return res.status(400).json({ error: messages.error.passwordEmpty });
        }
        
        const token = req.headers.authorization
    
        if (!token) {
            return res.status(401).json({ error:  "aaaaaaa" });
        }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not defined");
    }

    try {
        const isTokenValue= jwt.verify(token, process.env.JWT_SECRET) 
        const userEmail = isTokenValue.user.email;
        const userFind = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        
        if (!userFind) {
            return res.status(400).json({ error:  "aaaaaaa" });
        }
        
        const hashedPassword = await bcrypt.hash(confirmPassword, 10);
        console.log(hashedPassword);
//cambuar ek id
        const update = await prisma.user.update({
            where: { id: userFind.id },
            data: { password: hashedPassword },
        });
     
        res.json({message: "aaaaaa"})
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    } } catch (error) {
        return res.status(500).json({ error: "Something went wrongx2" });    
    }
};