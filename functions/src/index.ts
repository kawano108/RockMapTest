import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const FieldValue = admin.firestore.FieldValue;
const defaultFunctions = functions.region("asia-northeast1");
const store = defaultFunctions.firestore;
const adminStore = admin.firestore();

const funcs: { [name: string]: string } = {
  onCreateCourse: "./modules/onCreateCourse",
  onCreateClimbRecord: "./modules/onCreateClimbRecord",
  onUpdateClimbRecord: "./modules/onUpdateClimbRecord",
  onDeleteClimbRecord: "./modules/onDeleteClimbRecord",
  onWriteRockStorage: "./modules/onWriteStorage",
};

for (const name in funcs) {
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    exports[name] = require(funcs[name]).default;
  }
}

export {FieldValue, defaultFunctions, store, adminStore};
