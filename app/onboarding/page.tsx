"use client";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { onboardingSchema, OnBoardingSchema } from "../lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { onBoardingAction } from "../lib/action";
import { toast } from "sonner";
import { GeneralButton } from "../components/SubmitButton";
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnBoardingSchema>({
    resolver: zodResolver(onboardingSchema),
  });
  const onBoardingFormSubmit: SubmitHandler<OnBoardingSchema> = async (
    data
  ) => {
    const res = await onBoardingAction(data);
    console.log("response : ", res);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="">
          <CardTitle className="text-2xl font-semibold">
            Welcom to Cal<span className="text-primary">Scheduler</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile !
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(onBoardingFormSubmit)}
          className="space-y-4"
        >
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                {...register("fullName")}
                name="fullName"
                id="fullName"
                placeholder="Mohammed Samrose"
              />
              <p className="text-destructive">
                {errors.fullName && errors.fullName.message}
              </p>
            </div>
            <div className="grid gap-y-2">
              <Label htmlFor="userName">Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  CalScheduler.com/
                </span>
                <Input
                  {...register("userName")}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                  name="userName"
                  id="userName"
                />
              </div>
              <p className="text-destructive">
                {errors.userName && errors.userName.message}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <GeneralButton
              isSubmitting={isSubmitting}
              buttonText={"Submit"}
              loadingText={"Loading"}
              className="w-full"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default page;
