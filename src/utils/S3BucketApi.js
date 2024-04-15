import S3 from "react-aws-s3";

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || require("buffer").Buffer;
}

export async function s3BucketApiCall(method) {
  const config = {
    bucketName: "w3storage",
    dirName: `ProductImages`,
    region: "ap-south-1",
    accessKeyId: process.env.NEXT_PUBLIC_AWS_accessKeyId,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_secretAccessKey,
  };
  const ReactS3Client = new S3(config);
  if (method.apiType === "DELETE") {
    return ReactS3Client.deleteFile(method.payload);
  } else {
    return ReactS3Client.uploadFile(method.payload);
  }
}

export default async function s3BucketApiCallWrapper(method) {
  return new Promise((resolve, reject) => {
    s3BucketApiCall(method)
      .then((response) => {
        resolve(response || {});
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const handleUploadMediaToBucket = async (
  file,
  dir = "ProductImages"
) => {
  try {
    const method = {
      apiType: "POST",
      payload: file,
      dir: dir,
    };
    const result = await s3BucketApiCallWrapper(method);
    return result.location;
  } catch (error) {
    console.log({ error });

    return null;
  }
};

export const handleUploadMediaMultipleToBucket = async (
  files,
  dir = "ProductImages"
) => {
  try {
    const method = {
      apiType: "POST",
      payload: files,
      dir: dir,
    };
    const result = [];
    for (let i = 0; i < files.length; i++) {
      const res = await s3BucketApiCallWrapper({
        ...method,
        payload: files[i],
      });
      result.push(res.location);
    }
    return result;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const handleDeleteAttachmentFromS3 = async (link, dir) => {
  try {
    const method = {
      apiType: "DELETE",
      payload: link,
      dir: dir,
    };

    await s3BucketApiCallWrapper(method);
    return true;
  } catch (error) {
    console.log({ error });
    return false;
  }
};
