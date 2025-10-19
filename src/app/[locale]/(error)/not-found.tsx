"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white text-center dark:bg-background">
      <div className="flex-col items-center justify-center md:flex dark:text-gray-100">
        <div className="relative">
          <h1 className="select-none font-bold text-[150px] text-muted-foreground/20">
            404
          </h1>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
            <AlertCircle className="h-20 w-20 text-muted-foreground" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="font-semibold text-2xl tracking-tight">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex gap-2">
          <Button
            className="gap-2 text-muted-foreground"
            onClick={() => router.back()}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
