import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/models.interface";
import bcrypt from 'bcryptjs';

type UserDocument = User & Document & {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<UserDocument> = new Schema({
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
  captchaToken: {
    type: String,
    minLength: 10,
  },
}, {
  timestamps: true,
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = model<UserDocument>("User", userSchema);

export default userModel;
