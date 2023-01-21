import readlineSync from "readline-sync";
import fs from "fs/promises"
import c from "chalk";
import axios from "axios";

async function getTodos() {
  try {
    console.clear()
    console.log(
      c.red("========================================================")
    );
    console.log(c.yellowBright.bold.italic("\t \t \t TO-DO CLI"));
  console.log(
    c.red("========================================================")
  );
  console.log(c.green("\t \t  LIST OF ALL TODO'S "));
  console.log(
    c.red("========================================================")
  );
    let token = await fs.readFile("../authToken.txt")
    token = token.toString()
    let res = await axios.get("http://localhost:5001/api/todo/view", {
      headers: {
        "auth-token": token
      }
    })
    let data = res.data
    console.log("All tasks: ")
    console.table(data)

} catch (err) {
    console.log(err);
  }
}

export {getTodos}