import { createTransport } from 'nodemailer';
import { emailParams } from '../shared.js';

export { sendInvite };

const transporter = createTransport({
  host: emailParams.host,
  service: 'gmail',
  auth: {
    user: emailParams.address,
    pass: emailParams.password,
  },
});

function sendInvite(receiver, inviteKey) {
  // pass in email and invite key
  const htmlMessage = `
    <p>HTML version of the message</p>
    <p>And this is a <a href=https://youtu.be/V-_O7nl0Ii0?si=uBUlDTtna68OY4QX>link</a>
    <p>invite key: http://localhost:3000/signup/invite/${inviteKey}<p>
    `;
  const mailInvite = {
    from: {
      name: 'Tindeggle',
      address: emailParams.address,
    }, // sender address. name is optional
    to: receiver,
    subject: 'This is an invitaion',
    // text: "Plaintext version of the message", // The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…'})
    html: htmlMessage, // The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
  };
  return transporter.sendMail(mailInvite);
}
