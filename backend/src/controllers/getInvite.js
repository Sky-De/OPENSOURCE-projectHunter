import { Invite } from '../models/invite';

export { getInvite };

async function getInvite(req, res) {
  Invite;
  res.json({ invite: 'temp' });
}
