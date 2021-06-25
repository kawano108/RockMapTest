import {store, FieldValue} from "../index";
import {climbType} from "../models/ClimbType";

export default store
    .document("users/{userId}/climbRecord/{climbRecordId}")
    .onDelete((snap, context) => {
      const deletedValue = snap.data();
      const db = snap.ref.firestore;

      switch (deletedValue.type) {
        case climbType.flash:
          return db.doc(deletedValue.totalNumberReference.path)
              .update({flash: FieldValue.increment(-1)});

        case climbType.redPoint:
          return db.doc(deletedValue.totalNumberReference.path)
              .update({redPoint: FieldValue.increment(-1)});

        default:
          return;
      }
    });
