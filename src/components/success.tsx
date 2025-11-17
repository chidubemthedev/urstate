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

type Props = {
  trigger: React.ReactNode;
};

const Success = ({ trigger }: Props) => {
  return (
    <Dialog>
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
            Meanwhile, join our WhatsApp Channel to stay updated on available
            properties and rental tips.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-10">
          <Button type="submit" size={"lg"} className="w-full h-12">
            Join WhatsApp Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Success;
