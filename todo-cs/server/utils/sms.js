

import twilio from "twilio"


    async function sendsms(obj){
        const accountSid ="ACc40f913afd5ded30e9275346d9d40da7";
        const authToken  = "7b977fbb0b4baca50de316afe41f06a9"
        const client  = twilio(accountSid,authToken)
        let mes = await client.messages
        .create({
            body : "Thank You for registering at our Todo Application",
            from:"+13396751795",
            to: obj.phone,
        })
        console.log(mes.sid)

    }

// sendsms({phone:"+918712204003"})

    export {sendsms}