import Image from "next/image";
import { Button } from "../ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import Form from "../form";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="flex items-center justify-between sticky top-0 py-4 bg-white z-50">
      <div className="hidden md:flex">
        <Image src={"/images/logo.png"} width={158} height={37} alt="logo" />
      </div>
      <div className="flex md:hidden">
        <Image src={"/images/logo.png"} width={120} height={28} alt="logo" />
      </div>

      {/* <Link href={"/login"}>
        <Button
          size={"lg"}
          variant={"outline"}
          className="border border-[#0C2C43] hidden md:flex"
        >
          Sign In
        </Button>
      </Link> */}

      <Form
        trigger={
          <DialogTrigger asChild>
            <Button
              size={"sm"}
              variant={"outline"}
              className="border border-[#0C2C43] flex"
            >
              Join our Waitlist
            </Button>
          </DialogTrigger>
        }
      />
    </div>
  );
};

export default Nav;
