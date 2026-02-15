"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import RegisterOne from "@/components/auth/register-one";
import RegisterTwo from "@/components/auth/register-two";
import { useAuthStore } from "@/store/authStore";
import RegisterThree from "./register-three";
import { useState } from "react";
import EmailConfirmModal from "./email-confirm-modal";

const emailSchema = z.object({
  email: z.email("Invalid email address."),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms and conditions.",
  }),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(32, "Password must be at most 32 characters.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character.",
      ),
    confirm: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

const formSchema = z.intersection(emailSchema, passwordSchema);

const RegisterMain = () => {
  const { registerStep, userType } = useAuthStore();
  const [confirmEmail, setConfirmEmail] = useState(false);

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
    console.log({ ...data, userType });
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

      {confirmEmail === true && <EmailConfirmModal />}
    </div>
  );
};

export default RegisterMain;
