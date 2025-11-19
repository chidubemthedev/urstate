import Image from "next/image";
import { Button } from "../ui/button";
import Form from "../form";
import { DialogTrigger } from "../ui/dialog";

const Cta = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 md:my-20">
      <div className="flex items-center justify-center gap-2 bg-[#EB58361A] px-[21px] md:px-[27px] py-1 md:py-2 w-fit rounded-xl">
        <p className="text-[#333333] text-xs md:text-sm leading-[18px] md:leading-5">
          We are on a mission
        </p>
        <div className="flex md:hidden">
          <Image src={"/images/rocket.gif"} alt="gif" width={16} height={16} />
        </div>
        <div className="hidden md:flex">
          <Image src={"/images/rocket.gif"} alt="gif" width={24} height={24} />
        </div>
      </div>

      <p className="max-w-[651px] text-center mt-4 mb-6 md:mb-10 text-[#777777] text-[18px] md:text-[22px] leading-6 md:leading-8 font-bold">
        This isn’t just another housing platform. It’s a mission born{" "}
        <span className="text-primary/90">from lived experience</span> and
        shared by everyone who believes renting should be simple, fair, and
        reliable.
      </p>

      <Form
        trigger={
          <DialogTrigger asChild>
            <Button size={"lg"}>Join our mission</Button>
          </DialogTrigger>
        }
      />
    </div>
  );
};

export default Cta;
