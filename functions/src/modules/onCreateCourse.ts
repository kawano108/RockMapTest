import {store} from "../index";
import {TotalClimbedNumber} from "../models/TotalClimbedNumber";

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

export default store
    .document("users/{userId}/courses/{courseId}")
    .onCreate((snap, context) => {
      const totalClimbedNumberCollectionId = "totalClimbedNumber";

      const randomId = Math.random().toString(32).substring(2);
      const db = snap.ref.firestore;

      return db.doc(snap.ref.path)
          .collection(totalClimbedNumberCollectionId)
          .doc(randomId)
          .set(makeTotalClimbedNumber(randomId, snap.ref.path));
    });
