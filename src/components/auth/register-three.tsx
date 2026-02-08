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
import { EyeOffIcon } from "lucide-react";
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
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
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
              </Field>
            )}
          />

          <Button type="submit" form="register-form" size={"xl"}>
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
