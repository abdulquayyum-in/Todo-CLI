import express from "express"
import jwt from "jsonwebtoken"
import fs from "fs/promises"
import bcrypt from "bcrypt"
import { registryvalidation,errorValidation,loginvalidation } from "../../middlewares/validations/index.js"
import randomString from "random-string"
import authvalidator from "../../middlewares/auth/auth.js"
const router = express.Router();

router.post("/add",authvalidator,errorValidation,async(req,res)=>{
    try{
        // console.log(req.payload)
        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);
        let userFound = fileData.find((ele)=>ele.email==req.payload.email)

        if(!userFound){
         return res.status(401).json({error:"unauthorised Access"})
        }
        let todoData = {
            todoName: req.body.todoName,
            isCompleted: false,
            todo_id: randomString(12)
          }
        userFound.todo.push(todoData)
        await fs.writeFile("data.json",JSON.stringify(fileData));
        return res.status(200).json({message:"Successfull"})

        
    }catch(error){
        console.log(error)
    }
})

router.get("/view",authvalidator,async(req,res)=>{
    let fileData = await fs.readFile("data.json");
    fileData = JSON.parse(fileData);

    let userFound = fileData.find((ele)=>ele.email==req.payload.email)

    if(!userFound){
     return res.status(401).json({error:"unauthorised Access"})
    }
    else{
        return res.status(200).json(userFound.todo)
    }
})

router.put("/edit/:index",authvalidator,async(req,res)=>{
    let fileData = await fs.readFile("data.json");
    fileData = JSON.parse(fileData);
    let userFound = fileData.find((ele)=>ele.email==req.payload.email)
    let index = req.params.index
    console.log(index)

    if(!userFound){
        return res.status(401).json({error:"unauthorised Access"}) 
    }
    let name = req.body.name;
    userFound.todo[index].todoName = name;
    await fs.writeFile("data.json",JSON.stringify(fileData))
    return res.status(200).json({ Success: "Successfully Edited the task name" })

})


router.delete("/delete/:index",authvalidator,async(req,res)=>{
    let index = req.params.index;
    let fileData = await fs.readFile("data.json");
    fileData = JSON.parse(fileData);
    let userFound = fileData.find(ele=>ele.email == req.payload.email)
    if(!userFound ){
        return res.status(401).json({ error: "Unauthorized access" })
    }
    if (!userFound.todo[index])
    return res.status(400).json({ error: "Invalid Index" })
    userFound.todo.splice(index,1)
    await fs.writeFile("data.json",JSON.stringify(fileData))
    return res.status(200).json({ Success: "Successfully deleted the task" })

}) 

export default router;
