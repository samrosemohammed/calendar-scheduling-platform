"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/google-icon.svg";
import githubLogo from "@/public/github-icon.svg";
import { cn } from "../lib/utils";

interface GenerateButtonProps {
  imgSrc: string;
  imgAlt: string;
  imgDes: string;
}

interface SubmitButtonProps {
  isSubmitting: boolean;
  buttonText: string;
  loadingText?: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | null
    | undefined;
  className?: string;
}
export const GeneralButton = ({
  isSubmitting,
  buttonText,
  loadingText,
  variant,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      className={cn("w-fit", className)}
      variant={variant}
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin size-4" /> {loadingText}
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export const GenerateButton = ({
  imgAlt,
  imgSrc,
  imgDes,
}: GenerateButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant={"outline"} className="w-full">
      {pending ? <Loader2 className="animate-spin size-4 mr-1" /> : null}
      <Image src={imgSrc} alt={imgAlt} className="size-4" />
      {imgDes}
    </Button>
  );
};

export const GoogleAuthButton = () => {
  return (
    <GenerateButton
      imgSrc={googleLogo}
      imgAlt="google icon"
      imgDes="Sign in with Google"
    />
  );
};

export const GithubAuthButton = () => {
  return (
    <GenerateButton
      imgAlt="github icon"
      imgSrc={githubLogo}
      imgDes="Sign in with Github"
    />
  );
};
