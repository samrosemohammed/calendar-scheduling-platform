"use client";
import { cn } from "@/app/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
interface ButtonGroupProps {
  className?: string;
  children: ReactElement<any>[];
}
export const ButtonGroup = ({ className, children }: ButtonGroupProps) => {
  const totalButtons = Children.count(children);
  return (
    <div className={`${cn("flex w-full", className)}`}>
      {children.map((child, index) => {
        const isFirtItem = index === 0;
        const isLastItem = index === totalButtons - 1;
        return cloneElement(child, {
          key: child.key ?? index,
          className: cn(
            "flex-1",
            child.props.className,
            !isFirtItem && "rounded-l-none border-r-0",
            !isLastItem && "rounded-r-none"
          ),
        });
      })}
    </div>
  );
};
