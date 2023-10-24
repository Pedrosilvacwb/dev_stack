"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

import Question from "@/database/question.model";

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CreateUser = async (payload: CreateUserParams) => {
  try {
    connectToDatabase();

    const user = await User.create(payload);

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDatabase();
    const { clerkId, path, updateData } = params;
    await User.findByIdAndUpdate(clerkId, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};
