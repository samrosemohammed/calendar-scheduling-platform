import { z } from "zod";
export const onboardingSchema = z.object({
  fullName: z
    .string()
    .nonempty("Full Name is required")
    .min(3, "Full Name should be at least 3 characters")
    .max(150),
  userName: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username should be at least 3 characters")
    .max(50)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers and hyphens.",
    }),
});
export type OnBoardingSchema = z.infer<typeof onboardingSchema>;

export const settingsSchema = z.object({
  fullName: z
    .string()
    .nonempty("Full Name is required")
    .min(3, "Full Name should be at least 3 characters")
    .max(150),
  profileImage: z.string().url().optional().or(z.literal("").optional()),
});
export type SettingsSchema = z.infer<typeof settingsSchema>;

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z
    .number()
    .min(15, "Duration must be at least 15 minute")
    .max(60, "Duration must be at most 60 minutes"),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(300),
  videoCallSoftware: z.string().min(3),
});
export type EventTypeSchema = z.infer<typeof eventTypeSchema>;
