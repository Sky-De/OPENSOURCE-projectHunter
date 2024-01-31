import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

let HOST
if (process.env.REACT_APP_NODE_ENV === "dev") {
  console.log("Welcome to Dev mode")
  HOST = "http://localhost:5000";
}
else {
  HOST = "http://127.0.0.1"
}

const Home = () => {
  const [imageUrl, setImageUrl] = useState("");
  const awsAccess = process.env.REACT_APP_AWS_ACCESS;
  const awsSecret = process.env.REACT_APP_AWS_SECRET;

  useEffect(() => {
    getUser()
  }, []);

  async function getUser() {
    AWS.config.update({
      accessKeyId: awsAccess,
      secretAccessKey: awsSecret,
      region: "us-east-1",
    });

    const s3 = new AWS.S3();

    console.log(localStorage.getItem('accessToken'))
    const res = await fetch(HOST + '/api/user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();
    console.log(data)

    const params = {
      Bucket: "tindeggle-profile-pics",
      Key: "default.png",
    };

    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        console.error("Error getting S3 object URL:", err);
      } else {
        setImageUrl(url);
      }
    });
  }

  return (
    <div className="home">
      <h1 className="d-flex justify-content-center">This is the homepage</h1>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="S3 Image"
          style={{ maxWidth: "500px", maxHeight: "500px", objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default Home;
