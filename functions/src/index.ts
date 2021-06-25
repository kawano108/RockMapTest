import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const FieldValue = admin.firestore.FieldValue;
const store = functions.region("asia-northeast1").firestore;

const funcs: { [name: string]: string } = {
  onCreateCourse: "./modules/onCreateCourse",
  onCreateClimbRecord: "./modules/onCreateClimbRecord",
  onUpdateClimbRecord: "./modules/onUpdateClimbRecord",
  onDeleteClimbRecord: "./modules/onDeleteClimbRecord",
};

for (const name in funcs) {
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    exports[name] = require(funcs[name]).default;
  }
}

export {FieldValue, store};
