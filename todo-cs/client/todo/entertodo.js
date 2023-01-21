import c from "chalk";
import readlineSync from "readline-sync";
import axios from "axios";
import fs from "fs/promises";


async function taskentry() {
    try {
  
      console.clear()
      console.log(
        c.red("========================================================")
      );
      console.log(c.yellowBright.bold.italic("\t \t \t TO-DO CLI"));
    console.log(
      c.red("========================================================")
    );
    console.log(c.green("\t \t \t TASK ENTRY "));
    console.log(
      c.red("========================================================")
    );
      let email = readlineSync.questionEMail("Enter Your Mail: ");
      while (!email) {
        email = readlineSync.questionEMail("Enter Your Mail: ");
      }

    let todoName = readlineSync.question("Please enter a task: ");
    while(!todoName){
      todoName = readlineSync.question("Enter a valid task: ");
    }
    
    
    let token = await fs.readFile("../authToken.txt");
    token = token.toString();
    let res = await axios.post("http://localhost:5001/api/todo/add", {todoName},{
      headers: {
        "auth-token": token
      }
    });
    console.log(res.data.message)

  } catch (err) {
    console.log(err);
  }
}

export default taskentry;
