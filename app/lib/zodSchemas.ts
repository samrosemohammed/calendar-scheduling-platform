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
