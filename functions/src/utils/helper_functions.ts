import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import {adminStore} from "../index";

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
  if (collection === "users") {
    return `${collection}/${documentId}`;
  }

  const document = await adminStore
      .collectionGroup(collection)
      .where("id", "==", documentId)
      .get();

  const documentPath = document.docs[0].ref.path;
  console.log(documentPath);
  return documentPath;
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
