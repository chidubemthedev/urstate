import { GoogleIcon } from "@/assets/icons";
import LoginForm from "@/components/auth/login-form";
import ShellPage from "@/components/auth/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <ShellPage>
      <div className="w-full flex flex-col items-center justify-center max-w-96">
        <Button
          size={"xl"}
          variant={"outline"}
          className="w-full text-primary border border-primary"
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
              href={"/auth/register"}
              className="font-bold text-primary hover:underline hover:cursor-pointer underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </ShellPage>
  );
};

export default LoginPage;
