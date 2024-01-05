import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";
export const postProducts = async (data,res) => {
try {
  const newProduct = await prisma.product.create({
    data: data,
  });
 
    return res.status(200).json(mensagess.success.createProducto)
  
} catch (error) {
  return res.status(400).json( `error en controller${error}`)
}
}