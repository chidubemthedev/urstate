import {
  CopyrightIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  XIcon,
} from "@/assets/icons";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 md:flex-row items-center justify-between border-t-[0.5px] border-[#777777] pt-10 pb-14">
      <div className="space-y-4">
        <Image src={"/images/logo.png"} width={138} height={32} alt="logo" />
        <p className="text-[#333333] text-base leading-6">
          Your digital agent.
        </p>
      </div>

      <div className="space-y-6 flex flex-col md:items-end">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <p>Follow our journey</p>
            <div className="bg-[#777777] h-[23.5px] w-px" />
          </div>
          <div className="flex gap-4">
            <InstagramIcon />
            <LinkedinIcon />
            <XIcon />
            <TiktokIcon />
          </div>
        </div>
        <p className="flex items-center gap-px text-[#333333] text-xs leading-[18px]">
          <CopyrightIcon />
          2025 Urstate Technologies
        </p>
      </div>
    </div>
  );
};

export default Footer;
