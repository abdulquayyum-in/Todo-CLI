import c from "chalk";
import readlineSync from "readline-sync";
import axios from "axios";
import fs from "fs/promises"



async function deleteuser(){

    try {
        console.clear()
        console.log(
          c.red("========================================================")
        );
        console.log(c.yellowBright.bold.italic("\t \t \t TO-DO CLI"));
      console.log(
        c.red("========================================================")
      );
      console.log(c.green("\t \t \t USER DELETE "));
      console.log(
        c.red("========================================================")
      );

        let email = readlineSync.questionEMail("Enter Your Email: ");
    while(!email){
        email = readlineSync.questionEMail("Enter Your Email: ");
    }
    let password = readlineSync.question("Enter Your password: ", {
        hideEchoBack: true,
      });

      let token = await fs.readFile("../authToken.txt");
    token = token.toString();
    // console.log(token)
    let res = await axios.delete("http://localhost:5001/api/user/delete",{
        headers: {
            "auth-token": token
          }
    });
    // console.log(res)
    console.log(res.data.success)

    }catch(err){
        console.log(err)
    }

}

export default deleteuser;