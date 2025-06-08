import { AriaButtonProps, useButton } from "@react-aria/button";
import { CalendarState } from "@react-stately/calendar";
import { Button } from "../ui/button";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";
import { useFocusRing } from "@react-aria/focus";
export const CalendarButton = (
  prosp: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(prosp, ref);
  const { focusProps } = useFocusRing();
  return (
    <Button
      className=""
      size={"icon"}
      variant={"outline"}
      ref={ref}
      disabled={prosp.isDisabled}
      {...mergeProps(buttonProps, focusProps)}
    >
      {prosp.children}
    </Button>
  );
};
