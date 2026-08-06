import { EmailLock } from "@/assets/icons";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";

type Props = {
  setShowForgotModal: (show: boolean) => void;
};

const ForgotPasswordModal = ({ setShowForgotModal }: Props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast.error(error.message || "Failed to send reset email");
      } else {
        toast.success("Password reset email sent! Check your inbox.");
        setShowForgotModal(false);
        setEmail("");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        className="md:px-[136px] md:py-[100px] md:min-w-[670px]"
      >
        <DialogHeader className="flex">
          <EmailLock />
          <DialogTitle className="text-[#0C2C43] font-bold text-[38px] leading-10 mt-6">
            Forgot Your Password?
          </DialogTitle>
          <p className="text-[#777777] text-base leading-6">
            Enter the email associated with your account.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-sm text-[#0C2C43] mb-2">
            Email Address
          </label>
          <Input
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            aria-label="email"
          />

          <p className="text-muted-foreground text-sm mt-3">
            Remember your password?{" "}
            <span
              onClick={() => setShowForgotModal(false)}
              className="text-primary hover:cursor-pointer hover:underline"
            >
              Sign in.
            </span>
          </p>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full md:w-[420px]"
              size="xl"
              disabled={!email || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                "Reset password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
