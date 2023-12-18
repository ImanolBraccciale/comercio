import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";

export const getProducts = async (res) => {
try {

  const products = await prisma.product.findMany();
 
    return res.status(200).json(products)
  
} catch (error) {
  return res.status(400).json( `${mensagess.errors.errorGet} ${error}`)
}
}