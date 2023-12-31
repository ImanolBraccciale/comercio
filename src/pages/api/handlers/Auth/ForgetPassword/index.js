import { forgetPassword } from "@/pages/api/controllers/Resend/ForgetPassword/forgetPassword";

export default async function handleRequest(req,res) {
    let data;
    let response;
    try {
        
        switch (req.method) {
            case "POST":
               response = await forgetPassword(req,res)
               return res.json(response)
  
            default:
                break;
        }

    } catch (error) {
        return "error en handler"
    }

}