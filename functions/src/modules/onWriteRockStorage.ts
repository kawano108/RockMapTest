
import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import {defaultFunctions, adminStore, FieldValue} from "../index";

const collectionNames = [
  "rocks",
  "courses",
  "users",
];

const imageTypes = [
  {type: "header", fieldName: "headerUrl"},
  {type: "normal", fieldName: "imageUrls"},
  {type: "icon", fieldName: "photoURL"},
];

export default defaultFunctions
    .storage
    .object()
    .onFinalize(async (object) => {
      const filePath = object.name;
      if (typeof filePath === "undefined") {
        console.log("filePath is undefined");
        return;
      }

      const components = filePath.split("/");
      console.log("components " + components);

      const imageType = imageTypes.find((imageType) =>
        imageType.type === components[2]
      );
      const collection = collectionNames.find((collectionName) =>
        collectionName === components[0]
      );
      if (
        typeof imageType === "undefined" || typeof collection === "undefined"
      ) {
        console.log("image type or collection is undefined");
        return;
      }

      const destination = await makeDocumentPath(collection, components[1]);
      const dlURL = makeDlURL(object);
      if (imageType.type === "normal") {
        return adminStore
            .doc(destination)
            .update({[imageType.fieldName]: FieldValue.arrayUnion(dlURL)});
      } else {
        return adminStore
            .doc(destination)
            .update({[imageType.fieldName]: dlURL});
      }
    });

/**
 * make document path
 * @param {string} collection
 * @param {string} documentId
 * @return {string} document path
 */
async function makeDocumentPath(
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
function makeDlURL(object: ObjectMetadata): string {
  const STORAGE_ROOT = "https://storage.googleapis.com";

  const bucketName = object.bucket;
  console.log("bucket name is " + bucketName);

  const filePath = object.name;
  console.log("path is " + filePath);

  const dlURL = `${STORAGE_ROOT}/${bucketName}/${filePath}`;
  console.log("dl url: " + dlURL);
  return dlURL;
}
