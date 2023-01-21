import c from "chalk";
import readlineSync from "readline-sync";
import axios from "axios";
import fs from "fs/promises";
import { sendsms } from "../../server/utils/sms.js";
import deleteuser from "./userdelete.js";
import taskentry from "../todo/entertodo.js";
import { getTodos } from "../todo/viewtodo.js";
import { edittodo } from "../todo/edittodo.js";


async function userlogin(){
try{
console.clear()
console.log(
  c.red("========================================================")
);
console.log(c.yellowBright.bold.italic("\t \t \t TO-DO CLI"));
console.log(
c.red("========================================================")
);
console.log(c.green("\t \t \t USER LOGIN "));
console.log(
c.red("========================================================")
);
let email = readlineSync.questionEMail("Enter Your Mail: ");
while (!email) {
  email = readlineSync.questionEMail("Enter Your Mail: ");
}
console.log(
  c.red("Note: The password length should be minimum 8 letters")
);
let password = readlineSync.question("Enter Your password: ", {
  hideEchoBack: true,
});

let body = {
    password,email
}

let res = await axios.post("http://localhost:5001/api/user/login",body);

let payload = res.data
// connsole.log(payload)
await fs.writeFile("../authToken.txt",payload.token)
await loginmenu()

}
catch(err){
    if(err.response.data.errors){
        let errors = err.response.data.errors;
        errors.forEach(item => console.log(item.msg + " in " +item.param))
      }
      else console.log(err.response.data.error)
  
    }
}


export {userlogin,loginmenu}



async function loginmenu() {
	console.clear()
	console.log(
	    c.red("========================================================")
	  );
	  console.log(c.yellowBright.bold.italic("\t \t \t TO-DO CLI"));
	  console.log(
	    c.red("========================================================")
	  );
	  console.log(c.green("\t \t \t MAIN MENU "));
	  console.log(
	    c.red("========================================================")
	  );
	  console.log(
	    c.underline.cyanBright("Choose the Operation you want to Perform")
	  );
	  console.log(
	    c.whiteBright(`
	    1.Entering Task in TODO list
	    2.List all TODO'S
	    3.Edit an Existing TODO list
	    4.Delete Account
	   `)
	  );
	  console.log(
	    c.red("========================================================")
	  );
	let opt = readlineSync.questionInt("Enter the operation you want to perform:")
	switch (opt) {
	  case 1:
	   await taskentry()
	    break;
	  case 2:
	    await getTodos()
	  break;
	  case 3:
	    await edittodo()
	  case 4:
	    await deleteuser() 
	  default:
	   break;
}

}


// await loginmenu()