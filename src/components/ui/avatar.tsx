"use client";

import {
  Fallback as AvatarFallback,
  Image as AvatarImage,
  Root as AvatarRoot,
} from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: ComponentProps<typeof AvatarRoot>) {
  return (
    <AvatarRoot
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImageComponent({
  className,
  ...props
}: ComponentProps<typeof AvatarImage>) {
  return (
    <AvatarImage
      className={cn("aspect-square size-full", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallbackComponent({
  className,
  ...props
}: ComponentProps<typeof AvatarFallback>) {
  return (
    <AvatarFallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImageComponent as AvatarImage,
  AvatarFallbackComponent as AvatarFallback,
};
