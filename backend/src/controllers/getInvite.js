import { Invite } from '../models/invite.js';

export { getInvite };

async function getInvite(req, res) {
  Invite;
  res.json({ invite: 'temp' });
}
