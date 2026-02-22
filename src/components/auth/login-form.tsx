"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import ForgotPasswordModal from "./forgot-password-modal";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { EyeOffIcon, Loader2Icon } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { signIn, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const LoginForm = () => {
  const router = useRouter();
  const { passwordType, setPasswordType } = useAuthStore();
  const [showForgotModal, setShowForgotModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, formState } = form;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data;

    const { error } = await signIn.email({
      email,
      password,
    });

    if (error) {
      // Better Auth returns helpful error messages
      toast.error(error.message || "Something went wrong");
    } else {
      // Success! Redirect to dashboard (or onboarding check)
      toast.success("Login successful!");

      router.push("/dashboard");
    }
  }

  return (
    <div className="w-full">
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={control}
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
            control={control}
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
                <FieldDescription>
                  <span
                    className="text-primary hover:underline hover:cursor-pointer"
                    onClick={() => setShowForgotModal(true)}
                  >
                    Forgot password?
                  </span>
                </FieldDescription>
              </Field>
            )}
          />

          <Button
            type="submit"
            size={"xl"}
            form="login-form"
            disabled={formState.isSubmitting}
            aria-busy={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </FieldGroup>
      </form>
      {showForgotModal && (
        <ForgotPasswordModal setShowForgotModal={setShowForgotModal} />
      )}
    </div>
  );
};

export default LoginForm;
