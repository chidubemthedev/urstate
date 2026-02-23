"use client";
import { GoogleIcon } from "@/assets/icons";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "http://localhost:4000/dashboard",
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-96">
      <Button
        size={"xl"}
        variant={"outline"}
        className="w-full text-primary border border-primary"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
      <h1 className="text-primary text-[26px] leading-10 font-bold text-center py-8">
        Sign Into Your Account
      </h1>
      <LoginForm />
      <div className="mt-6">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="font-bold text-primary hover:underline hover:cursor-pointer underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
