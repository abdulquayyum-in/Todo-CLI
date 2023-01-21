import c from "chalk";
import readlineSync from "readline-sync";
import axios from "axios";
import fs from "fs/promises";

async function edittodo(email){
    try {
        console.clear()
        console.log(c.green(`=======================================\n
        \t\tEdit a todo\n 
     =======================================`));
        let token = await fs.readFile("../authToken.txt")
        token = token.toString()
        let todo = await axios.get("http://localhost:5001/api/todo/view",{
            headers: {
                "auth-token":token,
            }
        });
       let todos = todo.data;
        console.log("Choose a task");
        console.table(todos);

        let todoIndex = readlineSync.questionInt("Enter a task Index:");
        while (!todos[todoIndex]) {
            todoIndex = readlineSync.questionInt("Enter a valid index : ");
          }

        let res =  await axios.put(`http://localhost:5001/api/todo/edit/${todoIndex}`,{name: todoName}, {
            headers: {
              "auth-token": token
            }
          });
          console.log(response.data.Success)
          return
        }
 catch(err){
    console.log(err);
}
}

export {edittodo};



        





