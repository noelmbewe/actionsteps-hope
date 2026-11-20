import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const ZEFFY_URL = "https://www.zeffy.com/embed/donation-form/00be3707-c8e1-44ad-ad5b-5763735b7f9e";
const OPEN_EVENT = "actionsteps:open-zeffy";

export function openZeffyDonate() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function ZeffyDonateModal() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden sm:rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Donate to ActionSteps Counseling</DialogTitle>
          <DialogDescription>Complete your donation securely through Zeffy.</DialogDescription>
        </DialogHeader>
        <div className="relative">
          {!loaded && (
            <div className="flex items-center justify-center h-96 text-sm text-muted-foreground">
              Loading secure donation form…
            </div>
          )}
          <iframe
            src={ZEFFY_URL}
            title="Donate to ActionSteps Counseling"
            allow="payment"
            onLoad={() => setLoaded(true)}
            className={`w-full border-0 ${loaded ? "block" : "hidden"}`}
            style={{ height: "min(85vh, 700px)" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
