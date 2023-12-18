import { getProducts } from "../../controllers/Products/getProducts";
import { getProductsID } from "../../controllers/Products/getProductsID";
import { patchProducts } from "../../controllers/Products/patchProducts";
import { postProducts } from "../../controllers/Products/postProducts";

export default async function handleRequest(req,res) {
    
    let data;
    let response;
    try {
        
        switch (req.method) {
            case "POST":
               data = req.body
               response = await postProducts(data,res)
               return res.json(response)
            case "GET":
                if(req.query.id) response = await getProductsID(req,res)
                else response = await getProducts(res)

                return res.json(response)
            case "PATCH":
                response = await patchProducts(req,res)
                return res.json(response)
            case "DELETE":
        
            default:
                break;
        }

    } catch (error) {
        return "eror en handler"
    }

}