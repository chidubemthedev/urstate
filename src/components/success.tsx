import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  role?: string | null;
};

const Success = ({ trigger, open, onOpenChange, role }: Props) => {
  const getDescription = () => {
    if (role === "owner") {
      return (
        <>
          To list your property today, click below to connect directly with our
          onboarding team.
        </>
      );
    }

    if (role === "manager") {
      return (
        <>
          Start onboarding your properties now, connect with our team to get set
          up.
        </>
      );
    }

    // default (renter)
    return (
      <>
        Meanwhile, join our WhatsApp Channel to stay updated on available
        properties and rental tips.
      </>
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="md:px-[136px] md:py-[100px] md:min-w-[670px]">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <Image src={"/images/party.gif"} alt="gif" width={48} height={48} />
          </div>
          <DialogTitle className="text-[#0C2C43] font-bold text-[22px] leading-8 text-center">
            Thanks for joining Urstate!
            <br />
            You&apos;re now on our waitlist.
          </DialogTitle>
          <DialogDescription className="text-center text-[#777777] text-base leading-6">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-10">
          {/* Owner: show WhatsApp + Talk button; Manager: only Talk; Renter (default): only WhatsApp */}
          {role === "owner" && (
            <div className="flex flex-col gap-4 w-full">
              <Link href={"mailto:hello.urstate@gmail.com"} className="w-full">
                <Button type="button" size={"lg"} className="w-full h-12">
                  Talk to our team
                </Button>
              </Link>

              <Link
                href={"https://whatsapp.com/channel/0029VbBLLYU1NCrO6ZGIsO1J"}
                target={"_blank"}
                className="w-full"
              >
                <Button
                  type="button"
                  size={"lg"}
                  className="w-full h-12 border border-[#0C2C43]"
                  variant={"secondary"}
                >
                  Join WhatsApp Channel
                </Button>
              </Link>
            </div>
          )}

          {role === "manager" && (
            <Link href={"mailto:hello.urstate@gmail.com"} className="w-full">
              <Button type="button" size={"lg"} className="w-full h-12">
                Talk to our team
              </Button>
            </Link>
          )}

          {(!role || role === "renter") && (
            <Link
              href={"https://whatsapp.com/channel/0029VbBLLYU1NCrO6ZGIsO1J"}
              target={"_blank"}
              className="w-full"
            >
              <Button type="button" size={"lg"} className="w-full h-12">
                Join WhatsApp Channel
              </Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Success;
