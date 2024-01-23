import { Invite } from "../models/invite.js";
import { User } from '../models/user.js';
import { sendInvite } from "../utils/sendMail.js";

export { createInvite };


async function createInvite(req, res) {
    const data = req.body;

    const notValid = await validate(data); // Input Validation
    if (notValid) {
      return res.status(notValid.status).send(notValid.error);
    } 
    else {
        const key = await generateKey(data.username)
        const invite = await Invite.create({
        username: data.username,
        email: data.email,
        invite_key: key,
        // expiration: 
        })
        
        if (invite) {
            const result = sendInvite(date.email, htmlMessage)
            if ('err' in result) return res.status(400).send(result.err);
            return res.status(201).send('Invite sent.')
        }
        else {
            return res.status(400).send('error') 
        }
        
    }   
}

async function validate(data) {
    if (!('username' in data))
        return { error: 'Username not provided', status: 400 };

    if (!('email' in data))
        return { error: 'Email not provided', status: 400 };

    if (await User.findOne({ where: { username: data.username } }))
        return { error: 'Username is already taken', status: 400 }; // Username must be unique

    if (await User.findOne({ where: { email: data.email } }))
        return { error: 'Email is already taken', status: 400 }; // Email must be unique
}

async function generateKey(username) {
    // temporary, will fix later
    return username+"randstring123"
}

const htmlMessage = `
    <p>HTML version of the message</p>
    <p>And this is a <a href=https://youtu.be/xvFZjo5PgG0?si=aVghG-V-uRUzYHJE>link</a>
`;
