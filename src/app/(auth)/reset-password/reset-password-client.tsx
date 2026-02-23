"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, EyeOffIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  // Removed "error" from here so we can keep the user on the form to retry
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const checks = {
    length: password.length >= 8 && password.length <= 32,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(checks).every(Boolean) && password === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrorMsg(
        "Missing reset token. Please request a new password reset link.",
      );
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // FIX: The correct Better Auth payload
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token: token, // Pass the extracted token directly
      });

      if (error) {
        setStatus("idle"); // Go back to idle so they can click the button again
        setErrorMsg(
          error.message ||
            "Failed to reset password. The link may have expired.",
        );
      } else {
        setStatus("success");
        setTimeout(() => {
          router.push("/auth/login"); // Or wherever your login page is
        }, 3000);
      }
    } catch (err) {
      setStatus("idle");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2Icon className="size-8 animate-spin text-primary mb-4" />
        <h1 className="text-2xl font-bold text-primary">
          Resetting password...
        </h1>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-green-600">Password Reset!</h1>
        <p>Redirecting you to sign in...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-primary text-[26px] leading-10 font-bold text-center mb-6">
          Reset Password
        </h1>

        {/* Added error message display here */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={passwordType}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Tooltip>
                  <TooltipTrigger
                    type="button" // Prevent accidental form submission
                    onClick={() =>
                      setPasswordType(
                        passwordType === "password" ? "text" : "password",
                      )
                    }
                    className="hover:cursor-pointer"
                  >
                    <InputGroupAddon align="inline-end">
                      <EyeOffIcon />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>View Password</TooltipContent>
                </Tooltip>
              </InputGroup>

              <div className="mt-2">
                <p className="mb-1.5 text-sm text-gray-600">
                  Your password must include:
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={`size-4 ${checks.length ? "text-green-500" : "text-gray-400"}`}
                    />
                    <span
                      className={
                        checks.length ? "text-green-500" : "text-gray-600"
                      }
                    >
                      8-32 characters long
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={`size-4 ${checks.lower ? "text-green-500" : "text-gray-400"}`}
                    />
                    <span
                      className={
                        checks.lower ? "text-green-500" : "text-gray-600"
                      }
                    >
                      1 lowercase character (a-z)
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={`size-4 ${checks.upper ? "text-green-500" : "text-gray-400"}`}
                    />
                    <span
                      className={
                        checks.upper ? "text-green-500" : "text-gray-600"
                      }
                    >
                      1 uppercase character (A-Z)
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={`size-4 ${checks.number ? "text-green-500" : "text-gray-400"}`}
                    />
                    <span
                      className={
                        checks.number ? "text-green-500" : "text-gray-600"
                      }
                    >
                      1 number
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={`size-4 ${checks.special ? "text-green-500" : "text-gray-400"}`}
                    />
                    <span
                      className={
                        checks.special ? "text-green-500" : "text-gray-600"
                      }
                    >
                      1 special character e.g. ! @ # $ %
                    </span>
                  </div>
                </div>
              </div>
            </Field>

            <Field className="mt-4">
              <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="confirm"
                  type={confirmPasswordType}
                  placeholder="********"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <Tooltip>
                  <TooltipTrigger
                    type="button" // Prevent accidental form submission
                    onClick={() =>
                      setConfirmPasswordType(
                        confirmPasswordType === "password"
                          ? "text"
                          : "password",
                      )
                    }
                    className="hover:cursor-pointer"
                  >
                    <InputGroupAddon align="inline-end">
                      <EyeOffIcon />
                    </InputGroupAddon>
                  </TooltipTrigger>
                  <TooltipContent>View Password</TooltipContent>
                </Tooltip>
              </InputGroup>
              <div className="mt-2 text-sm">
                {confirm.length > 0 && (
                  <div className="flex items-center gap-2">
                    {password === confirm ? (
                      <span className="text-green-500">Passwords match</span>
                    ) : (
                      <span className="text-red-500">
                        Passwords do not match
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Field>

            <Button
              type="submit"
              size="xl"
              className="w-full mt-6"
              disabled={!allValid}
            >
              Reset Password
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordClient;
