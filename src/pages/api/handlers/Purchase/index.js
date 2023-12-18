import { getPurchaseDetail } from "../../controllers/Purchase/getPurchaseDetail";
import { getUserPurchases } from "../../controllers/Purchase/getUserPurhase";
import { postPurchase } from "../../controllers/Purchase/postPurchase";

export default async function handleRequest(req,res) {
    let data;
    let response;
    try {
        switch (req.method) {
            case "POST":
            response = await postPurchase(req,res)
            return res.json(response)
            case "GET":
                if(req.query.userId) response = await getUserPurchases(req,res)
                if(req.query.purchaseId) response = await getPurchaseDetail(req,res)

                return res.json(response)
            default:
                break;
        }

    } catch (error) {
        return "eror en handler"
    }

}