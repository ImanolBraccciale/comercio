import { confirmEmail } from "@/pages/api/controllers/Resend/ConfirmEmail/confirmEmail";


export default async function handleRequest(req,res) {
    let data;
    let response;
    try {
        
        switch (req.method) {
            case "POST":
               response = await confirmEmail(req,res)
               return res.json(response)
  
            default:
                break;
        }

    } catch (error) {
        return "error en handler"
    }

}