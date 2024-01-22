import jwt from 'jsonwebtoken';
import { jwtSecret, getToken } from '../shared.js';

export { getUser };

async function getUser(req, res) {
  const token = getToken(req);
  if ('error' in token) {
    return res.status(token.status).send(token.error);
  } else {
    jwt.verify(token.token, jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ error: err });

      const santizedDecoded = { ...decoded.user, password: undefined };

      return res.json(santizedDecoded);
    });
  }
}
