// 


import { dataURLtoFile } from "@/utils/function.helper";
import Resizer from "react-image-file-resizer";

export function resizeFile(file: Blob, quality: number): Promise<File> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "png",
      quality,
      0,
      (uri) => {
        // resolve(uri);
        const convertedImage = uri
        const convertedFile = dataURLtoFile(convertedImage as string, 'screenshot');
        resolve(convertedFile)
        resolve(convertedFile)
      },
      "base64"
    );
  })
};