"use server";

import { auth } from "./auth";
import { prisma } from "./prisma";
import { OnBoardingSchema } from "./zodSchemas";

export const getUserSession = async () => {
  const session = await auth();
  return session;
};
export const onBoardingAction = async (data: OnBoardingSchema) => {
  const session = await getUserSession();

  // check if username is taken
  const existingUserName = await prisma.user.findUnique({
    where: {
      username: data.userName,
    },
  });
  if (existingUserName && existingUserName.id !== session?.user?.id) {
    throw new Error(
      "Username is already taken. Please choose a different one."
    );
  }
  const userData = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      username: data.userName,
      name: data.fullName,
    },
  });
  return {
    data: userData,
    message: "Congratulations! Your profile is set up.",
    status: "success",
  };
};
