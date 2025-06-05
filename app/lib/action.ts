"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./prisma";
import { OnBoardingSchema, SettingsSchema } from "./zodSchemas";

export const getUserSession = async () => {
  const session = await auth();
  return session;
};
export const onSettingChange = async (data: SettingsSchema) => {
  const session = await getUserSession();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  const userData = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: data.fullName,
      image: data.profileImage || null,
    },
  });
  return {
    data: userData,
    message: "Profile updated successfully.",
    status: "success",
  };
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
      availability: {
        createMany: {
          data: [
            {
              day: "MONDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
            {
              day: "TUESDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
            {
              day: "WEDNESDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
            {
              day: "THURSDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
            {
              day: "FRIDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
            {
              day: "SATURDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
            {
              day: "SUNDAY",
              fromTime: "09:00",
              tillTime: "17:00",
            },
          ],
        },
      },
    },
  });
  redirect("/onboarding/grant-id");
};
