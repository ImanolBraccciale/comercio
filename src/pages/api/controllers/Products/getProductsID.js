import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";

export const getProductsID = async (req, res) => {
    try {
        const id = req.query.id
        const product = await prisma.product.findUnique(
            {
                where: {
                    id: id
                }
            });
        return res.status(200).json(product)

    } catch (error) {
        return res.status(400).json(`${mensagess.errors.errorGet} ${error}`)
    }
}