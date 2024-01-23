import { createTransport } from "nodemailer";
import { emailParams } from "../shared.js";

export { sendInvite };

const transporter = createTransport({
    host: emailParams.host,
    port: emailParams.port,
    auth: {
        user: emailParams.address,
        pass: emailParams.password
    },
});


const mailInvite = {
    from: {
        name: "Tindeggle",
        address: emailParams.address
    }, // sender address. name is optional
    to: "receiver@sender.com",
    subject: "This is an invitaion",
    // text: "Plaintext version of the message", // The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
    html: // The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
        "<p>HTML version of the message</p>",
  };
  

function sendInvite(receiver, htmlMessage){
    // pass in email and html containing invite link
    transporter.sendMail({...mailInvite, to: receiver, html: htmlMessage}, (err, info) => {
        if (err) return {err: err};
        return {info: info}
    }); // returns promise

    
}