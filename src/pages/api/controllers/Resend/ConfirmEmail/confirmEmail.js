import { prisma } from "@/pages/api/utils";
import { Confirm } from "@prisma/client";
import jwt from "jsonwebtoken";

export const confirmEmail = async (req, res) => {
  const { token } = req.body;

  try {
    // Decode JWT Token:
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch user using findUnique:
    const userFind = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userFind) return "user not found"

    // Update user's email confirmation status in the database:
    const updatedUser = await prisma.user.update({
      where: { id: userFind.id },
      data: { isEmailConfirmed: Confirm.TRUE },
    }).catch(error => {
      console.error("Error updating user:", error);
      throw error; // Rethrow the error to handle it in the catch block below
    });
  
    // Respond with success message:
    return res.status(200).json({ message: 'Email confirmed successfully.' });
  } catch (error) {
    // Handle token verification errors:
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
};
