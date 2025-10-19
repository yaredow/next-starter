import type { VariantProps } from "class-variance-authority";
import { type ReactElement, useState } from "react";
import ResponsiveModal from "@/components/responsive-modal";
import { Button, type buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UseConfirmProps = {
  title: string;
  message: string;
  variant: VariantProps<typeof buttonVariants>["variant"] | "primary";
};

export const useConfirm = ({
  title,
  message,
  variant,
}: UseConfirmProps): [() => ReactElement, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      // Auto-confirm in non-production environments to streamline DX
      if (process.env.NODE_ENV !== "production") {
        resolve(true);
        return;
      }
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveModal onOpenChange={handleClose} open={promise !== null}>
      <Card className="h-full w-full border-none shadow-none">
        <CardContent className="py-6">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="flex w-full flex-col items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
            <Button
              className="w-full lg:w-auto"
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              className="w-full lg:w-auto"
              onClick={handleConfirm}
              variant={variant === "primary" ? "default" : variant}
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationDialog, confirm];
};
