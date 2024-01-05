import { getUser } from "@/pages/api/controllers/User/getUser";
import { login } from "@/pages/api/controllers/User/login";

export default async function handleRequest(req,res) {
    let data;
    let response;
    try {
        
        switch (req.method) {
            case "POST":
               response = await login(req,res)
               return res.json(response)
            case "GET":
                response = await getUser ( req,res)
                 return res.json(response)
            default:
                break;
        }

    } catch (error) {
        return "error en handler"
    }

}