import * as testing from "@firebase/testing";

type IncrementableNumber = number | testing.firestore.FieldValue

export interface TotalClimbedNumber {
  id: string
  createdAt: Date
  updatedAt: Date | null
  parentPath: string
  flash: IncrementableNumber
  redPoint: IncrementableNumber
}
