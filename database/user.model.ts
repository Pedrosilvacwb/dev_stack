import { Schema, models, model, Document, Date } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  name: string;
  username: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfoliowebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  portfoliowebsite: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
