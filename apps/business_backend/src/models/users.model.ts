import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAcceptedTerms: {
    type: Boolean,
  },
  stores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true
    },
  ],
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true
    }
  ],
  captchaToken: {
    type: String,
    minLength: 10,
  },
  isPasswordGenerated: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
