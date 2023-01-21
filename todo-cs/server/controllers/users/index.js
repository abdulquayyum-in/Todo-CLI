import express from "express"
import jwt from "jsonwebtoken"
import fs from "fs/promises"
import bcrypt from "bcrypt"
import { sendsms } from "../../utils/sms.js"
import { registryvalidation,errorValidation,loginvalidation } from "../../middlewares/validations/index.js"
import authvalidator from "../../middlewares/auth/auth.js"
const router = express.Router();

router.post("/register",registryvalidation(),errorValidation,async(req,res)=>{
    try {
    
        let {email,password,username,location,phone,password2}=req.body

        let fileData = await fs.readFile("data.json")
        fileData = JSON.parse(fileData)

        //DUplicate users
        let userFound = fileData.find((ele)=>ele.email==req.body.email)

        if(userFound){
         return res.status(409).json({error:"user already exist"})
        }

        //Hashing
        password = await bcrypt.hash(password,12)

        let userdata = {email,username,location,phone,todo:[],password}
        fileData.push(userdata)
    
        await sendsms(userdata)
        await fs.writeFile("data.json",JSON.stringify(fileData))
        return res.status(200).json({msg:"user registered Successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
});

router.post("/login",loginvalidation(),errorValidation,async (req,res)=>{
    try {
        let fileData = await fs.readFile("data.json")
        fileData = JSON.parse(fileData)

        let userFound = fileData.find((ele)=>ele.email == req.body.email)
        if(!userFound){
            return res.status(401).json({error:"unauthorised access"})
        }
        const matchpassword = await bcrypt.compare(req.body.password,userFound.password)
        if(!matchpassword){
            return res.status(401).json({error:"unauthorised access"})
        }
        const payload = {email:userFound.email,username:userFound.username}
        const privatekey = 'codeforindia'
        const token = jwt.sign(payload,privatekey,{expiresIn:"10h"})
        res.status(200).json({message:"success",token,username:userFound.username})
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
});

router.delete("/delete",authvalidator,(async (req,res)=>{
    

    let email = req.payload.email
    // console.log(req.payload)
    let fileData = await fs.readFile("data.json")
    fileData = JSON.parse(fileData)
    let user = fileData.find(ele=>ele.email == email)
    let id = fileData.indexOf(user)
    fileData.splice(id,1)

    await fs.writeFile("data.json",JSON.stringify(fileData))
    res.status(200).json({success:"user has been deleted"})
}))

export default router;
