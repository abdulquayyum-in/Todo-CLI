import jwt from "jsonwebtoken"
const privatekey = "codeforindia";

function authvalidator(req,res,next){
    try{
        let token = req.headers["auth-token"]
        let payload = jwt.verify(token,privatekey)
        // console.log(payload)
        req.payload = payload
        return next()
    }catch(error){
        console.error(error)
        res.status(401).json({error:"Invalid token"})
    }
}
export default authvalidator;