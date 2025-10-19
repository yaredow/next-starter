import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ReactElement, useRef } from "react";
import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type ResponsiveModalProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ResponsiveModal({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps): ReactElement {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const drawerTitleRef = useRef<HTMLHeadingElement>(null);

  if (isDesktop) {
    return (
      <Dialog onOpenChange={onOpenChange} open={open}>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <DialogContent className="bordr-none hide-scrollbar max-h-[85vh] w-full overflow-y-auto p-0 sm:max-w-lg">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={onOpenChange} open={open}>
      <DrawerContent ref={drawerContentRef}>
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle ref={drawerTitleRef}>Title</DrawerTitle>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
