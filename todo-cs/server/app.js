import express from "express"
import userRoute from "../server/controllers/users/index.js"
import todoroute from "../server/controllers/todo/index.js"
const app = express()
const port = 5001;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("server is up");
});

app.use("/api/user",userRoute)=
app.use("/api/todo",todoroute)


app.listen(port,()=>{
    console.log("server established on port ",port)
})

//user

//login,sigup,delete

//api/user/login
//api/user/sign