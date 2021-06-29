import {store, FieldValue} from "../index";
import {climbType} from "../models/ClimbType";

export default store
    .document("users/{userId}/climbRecord/{climbRecordId}")
    .onUpdate((snap) => {
      const oldType = snap.before.data().type;
      const newValue = snap.after.data();
      const newType = newValue.type;
      const db = snap.after.ref.firestore;

      if (oldType === newType) {
        console.log("no need to update");
        return;
      }

      switch (newValue.type) {
        case climbType.flash:
          return db.doc(newValue.totalNumberReference.path)
              .update({
                flash: FieldValue.increment(1),
                redPoint: FieldValue.increment(-1),
              });

        case climbType.redPoint:
          return db.doc(newValue.totalNumberReference.path)
              .update({
                flash: FieldValue.increment(-1),
                redPoint: FieldValue.increment(1),
              });

        default:
          return;
      }
    });
