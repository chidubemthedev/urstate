import Image from "next/image";
import { Button } from "../ui/button";

const Cta = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="flex items-center justify-center gap-2 bg-[#EB58361A] px-[27px] py-2 w-fit rounded-xl">
        <p className="text-[#333333] text-sm leading-5">We are on a mission</p>
        <Image src={"/images/rocket.gif"} alt="gif" width={24} height={24} />
      </div>

      <p className="max-w-[651px] text-center mt-4 mb-10 text-[#777777] text-[22px] leading-8 font-bold">
        This isn’t just another housing platform. It’s a mission born{" "}
        <span className="text-[#EB5836]">from lived experience</span> and shared
        by everyone who believes renting should be simple, fair, and reliable.
      </p>

      <Button size={"lg"}>Join our mission</Button>
    </div>
  );
};

export default Cta;
