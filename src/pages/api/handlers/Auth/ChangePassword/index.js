import { changePassword } from "@/pages/api/controllers/User/changePassword";

export default async function handleRequest(req,res) {
    let data;
    let response;
    try {
        
        switch (req.method) {
            case "POST":
               response = await changePassword(req,res)
               return res.json(response)
  
            default:
                break;
        }

    } catch (error) {
        return "error en handler"
    }

}