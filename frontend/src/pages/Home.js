import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

const Home = () => {
  const [imageUrl, setImageUrl] = useState("");
  const awsAccess = process.env.AWS_ACCESS;
  const awsSecret = process.env.AWS_SECRET;

  useEffect(() => {
    AWS.config.update({
      accessKeyId: awsAccess,
      secretAccessKey: awsSecret,
      region: "us-east-1",
    });

    const s3 = new AWS.S3();

    /*
      This is where the work needs to get done
        1. Send a get request here to fetch the user information, and then the "Key" key in the params object needs to get the corresponding image names
    */
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
  }, []);

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
