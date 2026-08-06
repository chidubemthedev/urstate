import Image from "next/image";
type Props = {
  children: React.ReactNode;
};

const ShellPage = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen relative">
      <Image
        src={"/images/logo.png"}
        width={100}
        height={100}
        alt="logo"
        className="absolute top-8 left-5 md:left-20"
      />
      <div className="flex flex-col items-center justify-center px-5 md:px-[100px] min-w-full">
        {children}
      </div>

      <div className="hidden md:block bg-[#227CBD] px-16 pt-28 space-y-2.5 bg-[url(/images/auth-illustration.png)] bg-contain bg-bottom bg-no-repeat bg-origin-border">
        <h1 className="text-[46px] font-bold leading-12 text-white">
          Rent smarter.
        </h1>
        <h1 className="text-[46px] font-bold leading-12 text-white">
          Pay securely.
        </h1>
        <h1 className="text-[46px] font-bold leading-12 text-white">
          Manage with confidence.
        </h1>
        <p className="text-white leading-6">
          Your digital rental agent - secure rent payments, verified homes, and
          stress-free management.
        </p>
      </div>
    </div>
  );
};

export default ShellPage;
