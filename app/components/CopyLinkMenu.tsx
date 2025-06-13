"use client";
import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { toast } from "sonner";

export const CopyLinkMenu = ({ meetingUrl }: { meetingUrl: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link.");
    }
  };
  return (
    <div>
      <DropdownMenuItem onSelect={handleCopy}>
        <Link2 className="mr-2 size-4" />
        Copy
      </DropdownMenuItem>
    </div>
  );
};
