import { RegisterUser } from "@/assets/icons";

const RegisterOne = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center max-w-96 text-center">
        <h1 className="text-primary text-[26px] leading-10 font-bold text-center">
          Signing Up As?
        </h1>
        <p className="mt-2 mb-8">
          Choose the option that best describes you so we can tailor your
          experience.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="border border-[#0C2C43] rounded-2xl px-10 py-[30px] hover:cursor-pointer hover:bg-input/50 transition-all duration-300">
              <RegisterUser />
            </div>
            <p>Renter</p>
          </div>

          <div className="space-y-2 hover:cursor-pointer">
            <div className="border border-[#0C2C43] rounded-2xl px-10 py-[30px] hover:cursor-pointer hover:bg-input/50 transition-all duration-300">
              <RegisterUser />
            </div>
            <p>Owner/Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterOne;
