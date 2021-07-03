import {makeDocumentPath, makeDlURL} from "../utils/helper_functions";
import {defaultFunctions, adminStore, FieldValue} from "../index";

const collectionNames = [
  "rocks",
  "courses",
  "users",
];

export default defaultFunctions
    .storage
    .object()
    .onDelete(async (object) => {
      const filePath = object.name;
      if (typeof filePath === "undefined") {
        console.log("filePath is undefined");
        return;
      }

      const components = filePath.split("/");
      console.log("components " + components);

      if (components[2] !== "normal") {
        console.log("image type is not normal");
        return;
      }

      const collection = collectionNames.find((collectionName) =>
        collectionName === components[0]
      );
      if (typeof collection === "undefined") {
        console.log("collection is undefined");
        return;
      }

      const destination = await makeDocumentPath(collection, components[1]);
      const dlURL = makeDlURL(object);
      return adminStore
          .doc(destination)
          .update({"imageUrls": FieldValue.arrayRemove(dlURL)});
    });
