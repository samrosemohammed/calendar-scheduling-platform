"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { GeneralButton } from "./SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema, settingsSchema } from "../lib/zodSchemas";
import { toast } from "sonner";
import { onSettingChange } from "../lib/action";
import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";

interface SettingsCardProps {
  fullName: string;
  email?: string;
  profileImage?: string;
}
export const SettingCards = ({
  fullName,
  email,
  profileImage,
}: SettingsCardProps) => {
  const [currentProfileImage, setCurrentProfileImage] = useState<
    string | undefined
  >(profileImage);
  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  const onSaveChangesSubmit: SubmitHandler<SettingsSchema> = async (data) => {
    try {
      const res = await onSettingChange(data);
      console.log("response : ", res);
      if (res.status === "success") {
        toast.success(res.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteProfileImage = () => {
    setCurrentProfileImage(undefined);
    setValue("profileImage", "");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSaveChangesSubmit)} action="">
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input {...register("fullName")} defaultValue={fullName} />
            <p className="text-destructive">{errors.fullName?.message}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input disabled defaultValue={email} />
          </div>
          <div className="flex flex-col gap-y-5">
            <Label>Profile Image</Label>
            {currentProfileImage ? (
              <div className="relative w-fit">
                <img
                  src={currentProfileImage}
                  alt="Profile Preview"
                  className="size-16 rounded-full"
                />
                <Button
                  type="button"
                  onClick={handleDeleteProfileImage}
                  className="absolute -top-3 -right-3"
                  variant={"destructive"}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]?.ufsUrl) {
                    setCurrentProfileImage(res[0].ufsUrl);
                    setValue("profileImage", res[0].ufsUrl);
                    toast.success("Image uploaded!");
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
                className="your-custom-classes"
              />
            )}
            <Input
              type="hidden"
              {...register("profileImage")}
              value={currentProfileImage || ""}
            />
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <GeneralButton
            buttonText="Save Changes"
            loadingText="Loading"
            isSubmitting={isSubmitting}
          />
        </CardFooter>
      </form>
    </Card>
  );
};
