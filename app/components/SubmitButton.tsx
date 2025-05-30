"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/google-icon.svg";
import githubLogo from "@/public/github-icon.svg";

interface GenerateButtonProps {
  imgSrc: string;
  imgAlt: string;
  imgDes: string;
}

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
