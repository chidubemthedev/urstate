import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { CheckIcon, EyeOffIcon } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ArrowLeft } from "lucide-react";

type FormValues = {
  email: string;
  consent: boolean;
  password: string;
  confirm: string;
};

type Props = {
  form: UseFormReturn<FormValues>;
};

const RegisterThree = ({ form }: Props) => {
  const {
    setRegisterStep,
    passwordType,
    setPasswordType,
    confirmPasswordType,
    setConfirmPasswordType,
  } = useAuthStore();

  // watch password fields for live validation
  const password = form.watch("password") || "";
  const confirm = form.watch("confirm") || "";

  const checks = {
    length: password.length >= 8 && password.length <= 32,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const allValid = Object.values(checks).every(Boolean) && password === confirm;

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-96">
      <div
        onClick={() => setRegisterStep(2)}
        className="flex items-center justify-start w-full gap-2 mb-4 hover:cursor-pointer hover:bg-input/50 transition-all duration-300"
      >
        <ArrowLeft /> Go Back
      </div>
      <h1 className="text-primary text-[26px] leading-10 font-bold text-center">
        Create Password
      </h1>
      <div className="w-full text-start mt-8">
        <FieldGroup>
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    type={passwordType}
                    placeholder="********"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

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
            )}
          />

          <Controller
            control={form.control}
            name="confirm"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="confirm"
                    type={confirmPasswordType}
                    placeholder="********"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

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
            )}
          />

          <Button
            type="submit"
            form="register-form"
            size={"xl"}
            disabled={!allValid}
          >
            Create Account
          </Button>
        </FieldGroup>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <span className="font-bold text-primary hover:underline hover:cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterThree;
