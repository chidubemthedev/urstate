import { CheckmarkIcon } from "@/assets/icons";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="my-40">
      <div className="relative py-10 custom-dashed-border">
        {/* <div className="absolute left-[100px] top-0 translate-y-[-20%] w-[0.5px] h-[300px] bg-[#777777]" />
        <div className="absolute right-[100px] top-0 translate-y-[-20%] w-[0.5px] h-[300px] bg-[#777777]" /> */}
        <div className="custom-dashed-border rotate-90 w-[300px] absolute top-20" />
        <div className="custom-dashed-border rotate-90 w-[300px] absolute right-0 top-20" />

        <div className="flex items-center justify-center gap-2.5">
          <h1 className="text-[#0C2C43] font-bold text-[38px] leading-10 text-center">
            Built on Trust, Backed by Transparency
          </h1>
          <Image src={"/images/test.gif"} alt="gif" width={40} height={40} />
        </div>
        <div className="flex items-center justify-center gap-4 mt-[26px]">
          <p className="text-[#333333] text-base leading-6">
            Verified renters & properties
          </p>
          <CheckmarkIcon />
          <p className="text-[#333333] text-base leading-6">
            Secure rent payment & collection
          </p>
          <CheckmarkIcon />
          <p className="text-[#333333] text-base leading-6">
            Digital receipts & agreements
          </p>
          <CheckmarkIcon />
          <p className="text-[#333333] text-base leading-6">
            Dedicated support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
