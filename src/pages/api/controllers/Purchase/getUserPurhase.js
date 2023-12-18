import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
export const getUserPurchases = async (req, res) => {
    try {
      const { userId } = req.query;
      const purchases = await prisma.purchase.findMany({
        where: { user_id: userId },
      });
  
      return res.status(200).json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: mensagess.errors.errorServer });
    }
  };