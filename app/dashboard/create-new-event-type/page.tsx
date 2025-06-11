"use client";
import { GeneralButton } from "@/app/components/SubmitButton";
import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/buttonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { createEventType } from "@/app/lib/action";
import { EventTypeSchema, eventTypeSchema } from "@/app/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";
const Page = () => {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<EventTypeSchema>({
    resolver: zodResolver(eventTypeSchema),
  });
  const onEventTpeCreateSubmit = async (data: EventTypeSchema) => {
    await createEventType(data);
  };
  const handlePlatformChange = (platform: VideoCallProvider) => {
    setActivePlatform(platform);
    setValue("videoCallSoftware", platform);
  };
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create new aapointment type to start booking your events.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onEventTpeCreateSubmit)}>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input {...register("title")} placeholder="30 Minute meeting" />
              {errors.title && (
                <p className="text-destructive text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  CalScheduler.com/
                </span>
                <Input
                  {...register("url")}
                  className="rounded-l-none"
                  placeholder="example-url-1"
                />
              </div>
              {errors.url && (
                <p className="text-destructive text-sm">{errors.url.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Meet me in this meeting to meet me!"
              />
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select
                onValueChange={(value) => {
                  setValue("duration", Number(value));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className="text-destructive text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <Input type="hidden" {...register("videoCallSoftware")} />
              <ButtonGroup>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                  onClick={() => handlePlatformChange("Zoom Meeting")}
                >
                  Zoom
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }
                  onClick={() => handlePlatformChange("Google Meet")}
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() => handlePlatformChange("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
          <CardFooter className="mt-5 flex items-center justify-between">
            <Button asChild variant={"secondary"}>
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <GeneralButton
              buttonText="Create Event Type"
              loadingText="Loading"
              isSubmitting={isSubmitting}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;
