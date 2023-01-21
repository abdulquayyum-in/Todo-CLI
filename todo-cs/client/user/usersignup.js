import chalk from "chalk";
import readlineSync from "readline-sync";
import axios from "axios";
async function registerUser() {
    try {
        console.clear()
        console.log(
          chalk.red("========================================================")
        );
        console.log(chalk.yellowBright.bold.italic("\t \t \t TO-DO CLI"));
        console.log(
        chalk.red("========================================================")
        );
        console.log(chalk.green("\t \t \t USER SIGNUP "));
        console.log(
        chalk.red("========================================================")
        );
        let username = readlineSync.question("Enter Your Name : ");
        while (!username) {
            username = readlineSync.question("Please Enter a Valid Name : ");
        }
        let email = readlineSync.questionEMail("Enter your Email : ");
        console.log(chalk.red("\t*Start with your country code*"))
        let phone = readlineSync.question(`Enter Your Phone :`)
        while (!phone) {
            phone = readlineSync.question(`Enter Your Phone :` )
        }
        let location = readlineSync.question("Enter your Location : ");
        while (!location) {
            location = readlineSync.question("Please Enter a Valid Location : ");
        }
        // let password = readlineSync.questionNewPassword("Enter your Password : ");
        let password = readlineSync.question("Enter your password : ", {
            hideEchoBack: true,
        });
        let password2 = readlineSync.question("Re-Enter your password : ", {
            hideEchoBack: true,
        });
        while (password != password2) {
            console.log(chalk.red("Password Do Not Match"));
            password = readlineSync.question("Re-Enter your password : ", {
                hideEchoBack: true,
            });
            password2 = readlineSync.question("Confirm your password : ", {
                hideEchoBack: true,
            });
        }

        let body = {
            username,email,password,password2,location,phone
        }
        // console.log(body);
        let res = await axios.post("http://localhost:5001/api/user/register",body);
        console.log(chalk.green(res.data.msg));
    } catch (err) {
        if(err.response.data.errors){
            // console.log(err);
            let errors = err.response.data.errors;
            // console.log(errors)
            errors.forEach(item => console.log(chalk.redBright(`>> ${item.msg} in ${item.param}`)))
          }
          else console.log(err.response.data.error)
        // console.log(err)
      
        }
        // console.log(err.data)
        // console.log(err.response.data)
        // console.log(error.response.data.error);
        // console.error(error.response.data.errors);
      
    }


// registerUser();
export default registerUser;