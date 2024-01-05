import { prisma } from "../../utils";

export const confirmEmail = async (req, res) => {
    const { token } = req.params;
  
    try {
      const decoded = jwt.verify(token, process.env.CONFIRMATION_SECRET);
      const userId = decoded.userId;
  
      await prisma.user.update({
        where: { id: userId },
        data: { isEmailConfirmed: TRUE },
      });
  
      return res.status(200).json({ message: 'Email confirmed successfully.' });
    } catch (error) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }
  };