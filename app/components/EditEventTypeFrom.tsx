"use client";
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
import { ButtonGroup } from "./ui/buttonGroup";
import { GeneralButton } from "./SubmitButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventTypeSchema, EventTypeSchema } from "../lib/zodSchemas";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { editEventTypeAction } from "../lib/action";

interface EditEventTypeFormProps {
  id: string;
  duration: number;
  title: string;
  description: string;
  url: string;
  callProvider: string;
}

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export const EditEventTypeForm = ({
  id,
  duration,
  title,
  description,
  url,
  callProvider,
}: EditEventTypeFormProps) => {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(
    callProvider as VideoCallProvider
  );
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<EventTypeSchema>({
    resolver: zodResolver(eventTypeSchema),
    defaultValues: {
      title,
      url,
      description,
      duration,
      videoCallSoftware: callProvider as VideoCallProvider,
    },
  });
  const onEventTpeCreateSubmit = async (data: EventTypeSchema) => {
    await editEventTypeAction({ ...data, id });
  };
  const handlePlatformChange = (platform: VideoCallProvider) => {
    setActivePlatform(platform);
    setValue("videoCallSoftware", platform);
  };
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit appointment type</CardTitle>
          <CardDescription>
            Edit apointment type to start booking your events.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onEventTpeCreateSubmit)}>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input
                defaultValue={title}
                {...register("title")}
                placeholder="30 Minute meeting"
              />
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
                  defaultValue={url}
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
                defaultValue={description}
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
                defaultValue={String(duration)}
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
              buttonText="Edit Event Type"
              loadingText="Loading"
              isSubmitting={isSubmitting}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
