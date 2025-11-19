import { CheckmarkIcon, CheckmarkSmallIcon } from "@/assets/icons";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="my-20 md:my-40">
      <div className="relative py-10 custom-dashed-border">
        {/* <div className="absolute left-[100px] top-0 translate-y-[-20%] w-[0.5px] h-[300px] bg-[#777777]" />
        <div className="absolute right-[100px] top-0 translate-y-[-20%] w-[0.5px] h-[300px] bg-[#777777]" /> */}
        {/* <div className="custom-dashed-border rotate-90 w-[300px] absolute top-20" />
        <div className="custom-dashed-border rotate-90 w-[300px] absolute right-0 top-20" /> */}

        <div className="flex md:hidden items-center justify-center mb-2">
          <Image src={"/images/test.gif"} alt="gif" width={32} height={32} />
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <h1 className="text-[#0C2C43] font-bold text-[18px] md:text-[38px] leading-6 md:leading-10 text-center">
            Built on Trust,
            <span className="md:hidden">
              <br />
            </span>{" "}
            Backed by Transparency
          </h1>
          <div className="hidden md:flex">
            <Image src={"/images/test.gif"} alt="gif" width={40} height={40} />
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center gap-4 mt-[26px]">
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

        <div className="flex flex-col md:hidden items-center justify-center gap-2 mt-[26px]">
          <CheckmarkSmallIcon />
          <p className="text-[#333333] text-xs leading-[18px]">
            Verified renters & properties
          </p>
          <CheckmarkSmallIcon />
          <p className="text-[#333333] text-xs leading-[18px]">
            Secure rent payment & collection
          </p>
          <CheckmarkSmallIcon />
          <p className="text-[#333333] text-xs leading-[18px]">
            Digital receipts & agreements
          </p>
          <CheckmarkSmallIcon />
          <p className="text-[#333333] text-xs leading-[18px]">
            Dedicated support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
