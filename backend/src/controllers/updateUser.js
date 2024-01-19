import { s3 } from '../shared.js';

export { updateUser };

async function updateUser(req, res) {
  const file = req.file;

  if (!file) {
    return req.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: 'tindeggle-profile-pics',
    Key: 'user/' + file.originalname,
    Body: file.buffer,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file to S3.');
    }

    console.log('File uploaded successfully: ', data.location);
    return res.status(200).send('File uploaded to S3.');
  });
}
