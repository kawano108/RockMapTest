import {defaultFunctions, adminStore, FieldValue} from "../index";
import {makeDocumentPath, makeDlURL} from "../utils/helper_functions";

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
