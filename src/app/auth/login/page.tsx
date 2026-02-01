import { GoogleIcon } from "@/assets/icons";
import LoginForm from "@/components/login/form";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center px-[100px]">
        <div className="w-full flex flex-col items-center justify-center max-w-96">
          <Button
            size={"xl"}
            variant={"outline"}
            className="w-full text-primary border border-primary hover:bg-primary/90"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          <h1 className="text-primary text-[26px] leading-10 font-bold text-center py-8">
            Sign Into Your Account
          </h1>
          <LoginForm />
        </div>
      </div>
      <div className="bg-blue-300"></div>
    </div>
  );
};

export default LoginPage;
