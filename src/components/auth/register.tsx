"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { GoogleIcon } from "@/assets/icons";
import LoginForm from "@/components/auth/login-form";
import RegisterOne from "@/components/auth/register-one";
import RegisterTwo from "@/components/auth/register-two";
import ShellPage from "@/components/auth/shell";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import RegisterThree from "./register-three";

const emailSchema = z.object({
  email: z.email("Invalid email address."),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms and conditions.",
  }),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

const formSchema = z.intersection(emailSchema, passwordSchema);

const RegisterMain = () => {
  const { registerStep } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      consent: false,
      confirm: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  const Stepone = <RegisterOne />;

  const Steptwo = <RegisterTwo form={form} />;

  const Stepthree = <RegisterThree form={form} />;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center max-w-96 text-center">
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          {registerStep === 1 && Stepone}
          {registerStep === 2 && Steptwo}
          {registerStep === 3 && Stepthree}
        </form>
      </div>
    </div>
  );
};

export default RegisterMain;
