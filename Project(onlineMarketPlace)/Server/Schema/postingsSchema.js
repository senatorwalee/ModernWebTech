import mongoose from "mongoose";

//creating the schema for the databade

const postingsRecordSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  //   trim: true,
  //   enum: ["Electronics", "Clothing", "Home & Kitchen", "Books", "Other"],
  // },
  // description: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  //   min: 0,
  // },
  // productPicture: {
  //   type: String,
  //   required: true,
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// Automatically update `updatedAt` before saving
// postingsRecordSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

//creating the data model using the schema
const postingsRecordModel = new mongoose.model(
  "ProductPostings",
  postingsRecordSchema
);

const newRecord = new postingsRecordModel({
  userId: "456",
  productName: "Sample Product",
});

// testing 
newRecord.save()
  .then(() => console.log("Record saved"))
  .catch((error) => console.error("Error saving record:", error));


export default postingsRecordModel;
