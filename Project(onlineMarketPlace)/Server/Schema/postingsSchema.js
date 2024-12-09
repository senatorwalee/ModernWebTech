import mongoose, { Schema } from "mongoose";

const postingsRecordSchema = new mongoose.Schema({
  productName: {
    type: Schema.Types.Mixed,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ["Furniture", "Electronics", "Clothing", "Home & Kitchen", "Books", "Automobile", "Services", "Other"],
  },
  description: {
    type: Schema.Types.Mixed,
    required: true,
    trim: true,
    maxlength: 150,
  },
  address: {
    type: Schema.Types.Mixed,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  productPictures: {
    type: [Buffer],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update `updatedAt` before saving
postingsRecordSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Creating the data model using the schema
const postingsRecordModel = mongoose.model("ProductPostings", postingsRecordSchema,"productpostings");

export default postingsRecordModel;
