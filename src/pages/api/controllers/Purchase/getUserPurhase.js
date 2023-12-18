import { prisma } from "../../utils";
export const getUserPurchases = async (req, res) => {
    try {
      const { userId } = req.query;
      const purchases = await prisma.purchase.findMany({
        where: { user_id: userId },
      });
  
      return res.json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: messages.serverError });
    }
  };