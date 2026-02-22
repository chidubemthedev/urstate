"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { EyeOffIcon, CheckIcon } from "lucide-react";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
    setStatus("loading");
    setErrorMsg("");
    try {
      const { error } = await authClient.resetPassword({
        query: { token },
        body: { password },
      });
      if (error) {
        setStatus("error");
        setErrorMsg(error.message || "Something went wrong.");
      } else {
        setStatus("success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong.");
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

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Reset Failed</h1>
        <p>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-primary text-[26px] leading-10 font-bold text-center mb-6">
          Reset Password
        </h1>
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
                    asChild
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
              <div>
                <p className="mb-1.5">Your password must include:</p>
                <div className="space-y-1.5">
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={
                        checks.length ? "text-green-500" : "text-primary"
                      }
                    />
                    <span
                      className={
                        checks.length ? "text-green-500" : "text-primary"
                      }
                    >
                      8-32 characters long
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={
                        checks.lower ? "text-green-500" : "text-primary"
                      }
                    />
                    <span
                      className={
                        checks.lower ? "text-green-500" : "text-primary"
                      }
                    >
                      1 lowercase character (a-z)
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={
                        checks.upper ? "text-green-500" : "text-primary"
                      }
                    />
                    <span
                      className={
                        checks.upper ? "text-green-500" : "text-primary"
                      }
                    >
                      1 uppercase character (A-Z)
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={
                        checks.number ? "text-green-500" : "text-primary"
                      }
                    />
                    <span
                      className={
                        checks.number ? "text-green-500" : "text-primary"
                      }
                    >
                      1 number
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckIcon
                      className={
                        checks.special ? "text-green-500" : "text-primary"
                      }
                    />
                    <span
                      className={
                        checks.special ? "text-green-500" : "text-primary"
                      }
                    >
                      1 special character e.g. ! @ # $ %
                    </span>
                  </div>
                </div>
              </div>
            </Field>
            <Field>
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
                    asChild
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
              <div className="mt-2">
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
            <Button type="submit" size="xl" disabled={!allValid}>
              Reset Password
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
