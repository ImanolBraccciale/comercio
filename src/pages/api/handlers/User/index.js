import { postUser } from "../../controllers/User/postUser";

export default async function handleRequest(req,res) {
    
    let data;
    let response;
    try {
        
        switch (req.method) {
            case "POST":
            response = await postUser(req,res)
            return res.json(response)
            case "GET":
            case "PATCH":
   
            case "DELETE":
            default:
                break;
        }

    } catch (error) {
        return "eror en handler"
    }

}