import {
  FieldValue,
  store,
} from "../index";

import {climbType} from "../models/ClimbType";

export default store
    .document("users/{userId}/climbRecord/{climbRecordId}")
    .onCreate((snap) => {
      const newValue = snap.data();
      const db = snap.ref.firestore;

      switch (newValue.type) {
        case climbType.flash:
          return db.doc(newValue.totalNumberReference.path)
              .update({flash: FieldValue.increment(1)});

        case climbType.redPoint:
          return db.doc(newValue.totalNumberReference.path)
              .update({redPoint: FieldValue.increment(1)});

        default:
          return;
      }
    });
