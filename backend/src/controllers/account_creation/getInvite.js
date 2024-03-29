import { Invite } from '../../models/invite.js';

export { getInvite };

async function getInvite(req, res) {
  const invite = await Invite.findOne({
    where: { invite_key: req.params.ikey },
  });

  if (!invite) return res.status(404).send('no invite');
  let currDate = new Date();
  if (invite.expiration <= currDate)
    return res.status(400).send('invite expired').json(invite);

  return res.json(invite);
}
