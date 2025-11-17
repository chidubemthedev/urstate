import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center flex-col gap-10 h-[60vh]">
      <div className="hidden md:flex absolute left-30 top-30 items-center justify-center gap-2 bg-[#85BFE9] rounded-xl px-[13.5px] py-1">
        <p className="text-[#333333] text-sm leading-5">
          We&apos;re still in Pre-Alpha!
        </p>
        <Image src={"/images/cloud.gif"} alt="gif" width={32} height={32} />
      </div>
      <div className="hidden md:flex absolute right-20 top-45 items-center justify-center gap-2 bg-[#F8C7BC] rounded-xl px-[13.5px] py-1">
        <p className="text-[#333333] text-sm leading-5">
          But we&apos;ve got you regardless.
        </p>
        <Image src={"/images/star.gif"} alt="gif" width={32} height={32} />
      </div>

      <div className="flex flex-col items-center justify-center text-[#0C2C43]">
        <div className="md:hidden flex items-center justify-center gap-2 bg-[#85BFE9] rounded-xl px-[13.5px] py-1">
          <p className="text-[#333333] text-[10px] leading-[18px]">
            We&apos;re still in Pre-Alpha!
          </p>
          <Image src={"/images/cloud.gif"} alt="gif" width={16} height={16} />
        </div>
        <h1 className="font-bold text-[26px] md:text-[56px] leading-10 md:leading-20 text-center">
          Renting.
        </h1>
        <h1 className="font-bold text-[26px] md:text-[56px] leading-10 md:leading-20 text-center">
          Made Simple.
        </h1>
        <h1 className="font-bold text-[26px] md:text-[56px] leading-10 md:leading-20 text-center">
          Transparent & secure.
        </h1>
        <div className="md:hidden flex items-center justify-center gap-2 bg-[#F8C7BC] rounded-xl px-[13.5px] py-1">
          <p className="text-[#333333] text-[10px] leading-[18px]">
            But we&apos;ve got you regardless.
          </p>
          <Image src={"/images/star.gif"} alt="gif" width={16} height={16} />
        </div>
        <p className="text-[#777777] text-base leading-6 text-center">
          Urstate helps renters, landlords, and property managers manage rent,
          payments, and trust — all in one place.
        </p>
      </div>
      <Button size={"lg"}>Join our Waitlist</Button>
    </div>
  );
};

export default Hero;
