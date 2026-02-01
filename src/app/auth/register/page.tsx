import { GoogleIcon } from "@/assets/icons";
import LoginForm from "@/components/auth/login-form";
import RegisterOne from "@/components/auth/register-one";
import ShellPage from "@/components/auth/shell";
import { Button } from "@/components/ui/button";

const Register = () => {
  const Stepone = <div>Step 1</div>;

  const Step2 = <div>Step 2</div>;

  const Step3 = <div>Step 3</div>;

  return (
    <ShellPage>
      <RegisterOne />
    </ShellPage>
  );
};

export default Register;
