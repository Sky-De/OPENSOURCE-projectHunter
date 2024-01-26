import jwt from 'jsonwebtoken';
import { getToken, jwtSecret } from '../shared.js';
import { User } from '../models/user.js';

export { deletePicture };

async function deletePicture(req, res) {
  let user = '';
  const token = getToken(req);
  if ('error' in token) {
    return res.status(token.status).send(token.error);
  } else {
    jwt.verify(token.token, jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ error: err });

      user = { ...decoded.user, password: undefined };
    });
  }

  const user_obj = await User.findOne({ where: { username: user.username } });

  const { name } = req.params;

  // Only deleting path from Database, must delete S3 files manually for now
  user_obj.pictures = user_obj.pictures.filter(function (item) {
    return item !== `${user_obj.username}/${name}`;
  });
  await User.update(
    { pictures: user_obj.pictures },
    { where: { username: user.username } },
  );
  res.status(200).json({ message: 'File deleted successfully' });
}
