import jwt from 'jsonwebtoken';
import { s3, getToken, jwtSecret } from '../shared.js';
import { User } from '../models/user.js';

export { addPicture };

async function addPicture(req, res) {
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

  const file = req.file;
  if (!file) {
    return req.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: 'tindeggle-profile-pics',
    Key: `${user.username}/${file.originalname}`,
    Body: file.buffer,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file to S3.');
    }

    console.log('File uploaded successfully: ', data.location);

    console.log(user_obj);
    user_obj.pictures.push(`${user.username}/${file.originalname}`);

    await User.update(
      { pictures: user_obj.pictures },
      { where: { username: user.username } },
    );

    return res.status(200).send('File uploaded to S3.');
  });
}
