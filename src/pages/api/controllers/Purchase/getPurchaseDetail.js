import { prisma } from "../../utils";

export const getPurchaseDetail = async (req,res) => {
    try {
        const { purchaseId } = req.query;
    
        const purchase = await prisma.purchase.findUnique({
          where: { id: purchaseId },
          include: { details: true },
        });
    
        if (!purchase) {
          return res.status(404).json({ message: messages.purchaseNotFound });
        }
    
       return  res.json(purchase.details);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: messages.serverError });
      }

}