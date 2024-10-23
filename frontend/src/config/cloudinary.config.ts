/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
// 

import { v2 as cloudinary } from 'cloudinary'
require('dotenv').config()




cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_SECRET_KEY
});


export const UploadImage = async (imageBuffer: Buffer) => {
  return new Promise(async (resolve, reject) => {
    // Use a Readable Stream for Node.js
    cloudinary.uploader.upload_stream(
      { folder: 'files' },
      (error: unknown, result: any) => {
        if (error) {
          console.log(error);
          console.log(error);
          reject(new Error('Upload failed'));
          throw new Error(error as string)
        } else {
          resolve(result.secure_url); // Return the secure URL
        }
      }
    ).end(imageBuffer)

    // Pipe the file to the upload stream
    // const buffer = Buffer.from(await imageFile.arrayBuffer());
    // stream.end(buffer);
  })

}
