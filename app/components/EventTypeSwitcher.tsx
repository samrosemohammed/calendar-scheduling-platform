"use client";
import { Switch } from "./ui/switch";
import { updateEventTypeStatus } from "../lib/action";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

export const MenuActiveSwitch = ({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(updateEventTypeStatus, undefined);
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    }
    if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <Switch
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId,
            isChecked: isChecked,
          });
        });
      }}
      defaultChecked={initialChecked}
    />
  );
};
