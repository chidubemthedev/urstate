import { EmailShield } from "@/assets/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EmailConfirmModal = () => {
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className="md:px-[136px] md:py-[100px] md:min-w-[670px]"
      >
        <DialogHeader className="flex items-center justify-center">
          <EmailShield />
          <DialogTitle className="text-[#0C2C43] font-bold text-[38px] leading-10 text-center">
            Confirm Email
          </DialogTitle>
          <p className="text-[#777777] text-base leading-6 text-center">
            Click the link in the email to confirm your email address.
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EmailConfirmModal;
