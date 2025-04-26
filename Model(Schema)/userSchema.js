import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,

    },
    phone: {
      type: String,

    },
    bio: {
      type: String,

    },
    profilePicture: {
      type: String,
      default: "",
    },

    cart: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        // other fields as needed, like course name, price, etc.
      }
    ],
    cart: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        // other fields as needed, like course name, price, etc.
      }
    ],
    myLearning: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Course ID
        quantity: { type: Number, required: true },
      }
    ],
  },
  { timestamps: true }
);




export const User = mongoose.model("User", userSchema);
