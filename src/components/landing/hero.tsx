import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center flex-col gap-10 h-[60vh]">
      <div className="absolute left-30 top-30 flex items-center justify-center gap-2 bg-[#85BFE9] rounded-xl px-[13.5] py-1">
        <p className="text-[#333333] text-sm leading-5">
          We&apos;re still in Pre-Alpha!
        </p>
        <Image src={"/images/cloud.gif"} alt="gif" width={32} height={32} />
      </div>
      <div className="absolute right-20 top-45 flex items-center justify-center gap-2 bg-[#F8C7BC] rounded-xl px-[13.5] py-1">
        <p className="text-[#333333] text-sm leading-5">
          But we&apos;ve got you regardless.
        </p>
        <Image src={"/images/star.gif"} alt="gif" width={32} height={32} />
      </div>

      <div className="flex flex-col items-center justify-center text-[#0C2C43]">
        <h1 className="font-bold text-[56px] leading-20">Renting</h1>
        <h1 className="font-bold text-[56px] leading-20">Made Simple</h1>
        <h1 className="font-bold text-[56px] leading-20">
          Transparent & secure
        </h1>
        <p className="text-[#777777] text-base leading-6">
          Urstate helps renters, landlords, and property managers manage rent,
          payments, and trust — all in one place.
        </p>
      </div>
      <Button size={"lg"}>Join our Waitlist</Button>
    </div>
  );
};

export default Hero;
