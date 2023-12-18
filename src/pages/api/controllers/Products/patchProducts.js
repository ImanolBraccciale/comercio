import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";

export const patchProducts = async (req, res) => {
    try {
        const id = req.query.id
        const { name, description, price, stock,} = req.body

        const existProduct = await prisma.product.findUnique(
            {
                where: {
                    id
                }
            });
            if (!existProduct) return  res.status(400).json(mensagess.errors.existProduct) 
            
        const update = await prisma.product.update({
            where: { id },
            data: {
              name,
              description,
              price,
              stock,
            },
          })
            
        return res.status(200).json(mensagess.success.updateProduct)

    } catch (error) {
        return res.status(400).json(`${mensagess.errors.errorGet} ${error}`)
    }
}