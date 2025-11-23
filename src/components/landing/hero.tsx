import Image from "next/image";
import { Button } from "../ui/button";
import Form from "../form";
import { DialogTrigger } from "../ui/dialog";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center flex-col gap-6 md:gap-10 py-10 md:py-20">
      <div className="hidden md:flex absolute left-[9%] top-[25%] items-center justify-center gap-2 bg-[#85BFE9] rounded-xl px-[13.5px] py-1 -z-10">
        <p className="text-[#333333] text-sm leading-5">
          We&apos;re still in Pre-Alpha!
        </p>
        <Image src={"/images/cloud.gif"} alt="gif" width={32} height={32} />
      </div>
      <div className="hidden md:flex absolute right-[5%] top-[35%] items-center justify-center gap-2 bg-[#F8C7BC] rounded-xl px-[13.5px] py-1 -z-10">
        <p className="text-[#333333] text-sm leading-5">
          But we&apos;ve got you regardless.
        </p>
        <Image src={"/images/star.gif"} alt="gif" width={32} height={32} />
      </div>

      <div className="flex flex-col items-center justify-center text-[#0C2C43]">
        <div className="md:hidden flex items-center justify-center gap-2 bg-[#85BFE9] rounded-xl px-[13.5px] py-1 mb-2">
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
        <div className="md:hidden flex items-center justify-center gap-2 bg-[#F8C7BC] rounded-xl px-[13.5px] py-1 mt-2 mb-4">
          <p className="text-[#333333] text-[10px] leading-[18px]">
            But we&apos;ve got you regardless.
          </p>
          <Image src={"/images/star.gif"} alt="gif" width={16} height={16} />
        </div>
        <p className="text-[#777777] text-xs md:text-base leading-[18px] md:leading-6 text-center">
          Urstate helps renters, landlords, and property managers manage rent,
          payments, and trust — all in one place.
        </p>
      </div>
      <Form
        trigger={
          <DialogTrigger asChild>
            <Button size={"lg"}>Join our Waitlist</Button>
          </DialogTrigger>
        }
      />
    </div>
  );
};

export default Hero;
