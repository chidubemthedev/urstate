import { GoogleIcon } from "@/assets/icons";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type FormValues = {
  name: string;
  email: string;
  consent: boolean;
  password: string;
  confirm: string;
};

type Props = {
  form: UseFormReturn<FormValues>;
};

const RegisterTwo = ({ form }: Props) => {
  const { setRegisterStep } = useAuthStore();

  // trigger validations for the email and consent fields only
  const validateStep = async () => {
    const valid = await form.trigger(["name", "email", "consent"]);
    if (valid) setRegisterStep(3);
  };

  const handleGoogleSignUp = async () => {
    const { setIsLoading } = useAuthStore.getState();
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "http://localhost:4000/auth/choose-role",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { isLoading } = useAuthStore();

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-96">
      <div
        onClick={() => setRegisterStep(1)}
        className="flex items-center justify-start w-full gap-2 mb-4 hover:cursor-pointer hover:bg-input/50 transition-all duration-300"
      >
        <ArrowLeft /> Go Back
      </div>
      <Button
        type="button"
        size={"xl"}
        variant={"outline"}
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full text-primary border border-primary"
      >
        <GoogleIcon />
        {isLoading ? "Signing up..." : "Signup with Google"}
      </Button>
      <h1 className="text-primary text-[26px] leading-10 font-bold text-center pt-8">
        Create Your Account
      </h1>
      <p>Enter your email to sign up.</p>
      <div className="w-full text-start mt-8">
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="consent"
            render={({ field, fieldState }) => (
              <FieldGroup data-slot="checkbox-group">
                <Field
                  className="flex items-start"
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    id="consent"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5"
                  />
                  <FieldLabel htmlFor="consent">
                    By creating a new account, I accept Urstate Terms &
                    Conditions and Privacy Policy.
                  </FieldLabel>
                </Field>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldGroup>
            )}
          />

          <Button type="button" size={"xl"} onClick={validateStep}>
            Continue
          </Button>
        </FieldGroup>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="font-bold text-primary hover:underline hover:cursor-pointer underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterTwo;
