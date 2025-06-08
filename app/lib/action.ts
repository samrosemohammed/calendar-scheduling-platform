"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./prisma";
import {
  EventTypeSchema,
  OnBoardingSchema,
  SettingsSchema,
} from "./zodSchemas";
import { revalidatePath } from "next/cache";
import { nylas } from "./nylas";

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

export const updateAvailability = async (formData: FormData) => {
  const session = await getUserSession();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: formData.get(`isActive-${id}`) === "on",
        fromTime: formData.get(`fromTime-${id}`) as string,
        tillTime: formData.get(`tillTime-${id}`) as string,
      };
    });
  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );
    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.log("Error updating availability:", error);
  }
};

export const createEventType = async (data: EventTypeSchema) => {
  const session = await getUserSession();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  console.log("Creating event type with data:", data);
  await prisma.eventType.create({
    data: {
      title: data.title,
      duration: data.duration,
      url: data.url,
      description: data.description,
      videoCallSoftware: data.videoCallSoftware,
      userId: session.user.id,
    },
  });
  return redirect("/dashboard");
};

export const createMeetingAction = async (formData) => {
  const getUserData = await prisma.user.findUnique({
    where: {
      username: formData.get("username") as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });
  if (!getUserData) {
    throw new Error("User not found");
  }
  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get("eventTypeId") as string,
    },
    select: {
      title: true,
      description: true,
    },
  });
  const fromTime = formData.get("fromTime") as string;
  const eventDate = formData.get("eventDate") as string;
  const meetingLength = Number(formData.get("meetingLength"));
  const provider = formData.get("provider") as string;
  const startDateTime = new Date(`${eventDate}T${fromTime}:00`);
  const endDateTime = new Date(
    startDateTime.getTime() + meetingLength * 60 * 1000
  );
  await nylas.events.create({
    identifier: getUserData.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        autocreate: {},
        provider: provider as any,
      },
      participants: [
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: getUserData.grantEmail as string,
      notifyParticipants: true,
    },
  });
  return redirect("/success");
};
