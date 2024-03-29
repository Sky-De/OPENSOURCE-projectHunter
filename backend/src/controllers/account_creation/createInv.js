import { Invite } from '../../models/invite.js';
import { User } from '../../models/user.js';
import { sendInvite } from '../../utils/sendMail.js';
import randomstring from 'randomstring';
import { Op } from 'sequelize';

export { createInvite };

async function createInvite(req, res) {
  const data = req.body;

  const notValid = await validate(data); // Input Validation
  if (notValid) return res.status(notValid.status).send(notValid.error);
  if (await Invite.findOne({ where: { email: data.email } })) {
    console.log(
      'Seems you\'ve already tried signing up. Sending a new invite...',
    );
    return resendInvite(req, res);
  } else {
    const key = generateKey();
    const invite = await Invite.create({
      username: data.username,
      email: data.email,
      invite_key: key,
      expiration: expiration(),
    });

    if (invite) {
      try {
        sendInvite(data.email, key);
        console.log('HOORAY!');
        return res.status(201).send('Invite sent.');
      } catch (err) {
        console.log('OOPS!');
        return res.status(500).send(err);
      }
    } else {
      console.log('no invite?');
      return res.status(404).send('error');
    }
  }
}

async function validate(data) {
  if (!('username' in data))
    return { error: 'Username not provided', status: 400 };

  if (!('email' in data)) return { error: 'Email not provided', status: 400 };

  if (await User.findOne({ where: { username: data.username } }))
    return { error: 'Username is already taken', status: 409 }; // Username must be unique

  if (await User.findOne({ where: { email: data.email } }))
    return { error: 'Email is already taken', status: 409 }; // Email must be unique

  if (
    await Invite.findOne({
      where: {
        [Op.and]: [
          { username: data.username },
          { email: { [Op.ne]: data.email } },
        ],
      },
    })
  )
    return { error: 'Username is already taken', status: 409 }; // Username must be unique
}

async function resendInvite(req, res) {
  const data = req.body;
  const invite = await Invite.findOne({ where: { email: data.email } });
  const new_key = generateKey();

  invite.username = data.username;
  invite.invite_key = new_key;
  invite.expiration = expiration();
  await invite.save();

  try {
    sendInvite(data.email, new_key);
    console.log('HOORAY!');
    return res.status(201).send('New invite sent.');
  } catch (err) {
    console.log('OOPS!');
    return res.status(500).send(err);
  }
}

function generateKey() {
  return randomstring.generate(30);
}

function expiration() {
  let expiration = new Date();
  console.log(expiration);
  expiration.setDate(expiration.getDate() + 1);
  return expiration;
}
