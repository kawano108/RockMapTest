import {ObjectMetadata} from "firebase-functions/lib/providers/storage";

/**
 * make document path
 * @param {string} collection
 * @param {string} documentId
 * @return {string} document path
 */
export async function makeDocumentPath(
    collection: string,
    documentId: string
): Promise<string> {
  return `${collection}/${documentId}`;
}

/**
 * make URL for download an image
 * @param {ObjectMetadata} object
 * @return {string} image url
 */
export function makeDlURL(object: ObjectMetadata): string {
  const STORAGE_ROOT = "https://storage.googleapis.com";

  const bucketName = object.bucket;
  console.log("bucket name is " + bucketName);

  const filePath = object.name;
  console.log("path is " + filePath);

  const dlURL = `${STORAGE_ROOT}/${bucketName}/${filePath}`;
  console.log("dl url: " + dlURL);
  return dlURL;
}
