import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";

export const getPurchaseDetail = async (req, res) => {
  try {

    const { purchaseId } = req.query;

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: { details: true },
    });

    if (!purchase)  return res.status(404).json({ message: mensagess.errors.purchaseNotFound });
    
    const detail = purchase.details

    const producTotal = await Promise.all(
      detail.map(async (producto) => {
        const product = await prisma.product.findUnique({
          where: {
            id: producto.product_id,
          },
        });
        return {
          name: product.name,
          ...producto
        };
      })
    );

    return res.status(200).json(producTotal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: mensagess.errors.errorServer});
  }

}