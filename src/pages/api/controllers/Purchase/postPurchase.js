import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";

export const postPurchase = async (req, res) => {
  try {
    const { email, products } = req.body;

    const userFind = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!userFind) return res.status(404).json({message: "not found"});

    const purchase = await prisma.purchase.create({
      data: {
        user: { connect: { id: userFind.id } },
        date: new Date(),
        details: {
          create: products.map((product) => ({
            product: { connect: { id: product.productId } },
            quantity: product.quantity,
            unit_price: product.price,
          })),
        },
      },
      include: { details: true },
    });

    const productIds = products.map((product) => product.productId);

    await prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: {
        stock: {
          decrement: products.reduce((acc, product) => acc + product.quantity, 0),
        },
      },
    });

    return res.json(purchase);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: messages.serverError });
  }
};