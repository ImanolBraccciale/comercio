import { prisma } from "../../utils";
import { mensagess } from "../../utils/messages";

export const getUser = async (req,res) => {
try {

  const products = await prisma.user.findMany();
 
    return res.status(200).json(products)
  
} catch (error) {
  return res.status(400).json( `${mensagess.errors.errorGet} ${error}`)
}
}