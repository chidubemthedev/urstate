import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
      <div>
        <div>
          <h1>Sign Into Your Account</h1>
          <div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-300"></div>
    </div>
  );
};

export default LoginPage;
