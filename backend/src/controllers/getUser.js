import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { jwtSecret, getToken } from '../shared.js';

export { getUser };

async function getUser(req, res) {
  const token = getToken(req);
  if ('error' in token) {
    return res.status(token.status).send(token.error);
  } else {
    jwt.verify(token.token, jwtSecret, async (err, decoded) => {
      if (err) return res.status(401).json({ error: err });
      // find user, sanitize user, and return
      const user = await User.findOne({ where: { username: decoded.user.username } });
      const sanitizedUser = { ...user, password: undefined};
    //   const santizedDecoded = { ...decoded.user, password: undefined };

      return res.json(sanitizedUser);
    });
  }
}
