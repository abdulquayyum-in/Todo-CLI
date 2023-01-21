import fs from "fs/promises"
import readlineSync from "readline-sync"
import loading from "loading-cli"
import c from "chalk";
import registerUser from "./user/usersignup.js";
import { userlogin,loginmenu } from "./user/userlogin.js";



async function displaymenu(){
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
        0.Exit
        1.User Login 
        2.User Create
       `)
      );
      console.log(
        c.red("========================================================")
      );
      let options = readlineSync.questionInt(
        ">> Enter the No for which operation you want to perform: "
      );
      switch (options) {
        case 0:
          console.log(c.redBright("Thank You for using Our CLI Application"));
        //   process.exit();
          return;
        case 1:
          console.log(c.blue("User Login"));
          await userlogin()
          break;
        case 2:
          console.log(c.blue("User Create"));
          await registerUser();
          break;
        // case 3:
        //   console.log(c.blue("Delete Account"));
        //   await deleteuser()
        //   break;
        // case 4:
        //     console.log(c.blue("Enter the task in TODO List"))
        //     await taskentry();
        //     break;
        // case 5:
        //     console.log(c.blue("Edit TODO task list"))
        //     await edittodo()
        //     break;
        // case 6:
        //     console.log(c.blue("List all TODO Tasks"))
        //     await getTodos();
        //     break;
        default:
          console.log("Invalid Options");
      }
      let ShouldContine = readlineSync.question("Do you want to continue (y/n)?");
      if (
        ShouldContine == "y" ||
        ShouldContine == "Y" ||
        ShouldContine == "yes" ||
        ShouldContine == "Yes"
      ) {
     let a =loading("Redirecting You to MainMenu");
     a.start()
        setTimeout(() => {
        loginmenu();
          a.stop()
        }, 1500);
       
      } else {
        console.clear();
        return console.log(c.redBright("Thank You for using Our CLI Application"));
      }
    }
    
    displaymenu();
    // export default displaymenu;
    
