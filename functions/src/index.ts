import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {TotalClimbedNumber} from "./model";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const totalClimbedNumberCollectionId = "totalClimbedNumber";
const flashString = "flash";
const redPointString = "redPoint";
const jpRegion = "asia-northeast1";

/**
 * make TotalClimbedNumber
 * @param {string} id
 * @param {string} parentPath
 * @return {TotalClimbedNumber} TotalClimbedNumber document.
 */
function makeTotalClimbedNumber(
    id: string,
    parentPath: string
): TotalClimbedNumber {
  return {
    id: id,
    createdAt: new Date,
    updatedAt: null,
    parentPath: parentPath,
    flash: 0,
    redPoint: 0,
  };
}

exports.createTotalClimbedNumberWhenOnCreateCourse = functions
    .region(jpRegion)
    .firestore
    .document("users/{userId}/courses/{courseId}")
    .onCreate((snap, context) => {
      const randomId = Math.random().toString(32).substring(2);

      return db.doc(snap.ref.path)
          .collection(totalClimbedNumberCollectionId)
          .doc(randomId)
          .set(makeTotalClimbedNumber(randomId, snap.ref.path));
    });

exports.updateTotalClimbedNumberWhebOnCreateClimbedRecord = functions
    .region(jpRegion)
    .firestore
    .document("users/{userId}/climbRecord/{climbRecordId}")
    .onCreate((snap, context) => {
      const newValue = snap.data();

      switch (newValue.type) {
        case flashString:
          return db.doc(newValue.totalNumberReference.path)
              .update({flash: FieldValue.increment(1)});

        case redPointString:
          return db.doc(newValue.totalNumberReference.path)
              .update({redPoint: FieldValue.increment(1)});

        default:
          return;
      }
    });

exports.updateTotalClimbedNumberWhebOnUpdateClimbedRecord = functions
    .region(jpRegion)
    .firestore
    .document("users/{userId}/climbRecord/{climbRecordId}")
    .onUpdate((snap, context) => {
      const oldType = snap.before.data().type;
      const newValue = snap.after.data();
      const newType = newValue.type;

      if (oldType === newType) {
        console.log("no need to update");
        return;
      }

      switch (newValue.type) {
        case flashString:
          return db.doc(newValue.totalNumberReference.path)
              .update({
                flash: FieldValue.increment(1),
                redPoint: FieldValue.increment(-1),
              });

        case redPointString:
          return db.doc(newValue.totalNumberReference.path)
              .update({
                flash: FieldValue.increment(-1),
                redPoint: FieldValue.increment(1),
              });

        default:
          return;
      }
    });

exports.updateTotalClimbedNumberWhebOnDeleteClimbedRecord = functions
    .region(jpRegion)
    .firestore
    .document("users/{userId}/climbRecord/{climbRecordId}")
    .onDelete((snap, context) => {
      const deletedValue = snap.data();

      switch (deletedValue.type) {
        case flashString:
          return db.doc(deletedValue.totalNumberReference.path)
              .update({flash: FieldValue.increment(-1)});

        case redPointString:
          return db.doc(deletedValue.totalNumberReference.path)
              .update({redPoint: FieldValue.increment(-1)});

        default:
          return;
      }
    });
