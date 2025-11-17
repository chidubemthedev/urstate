import Image from "next/image";
import { Button } from "../ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import Form from "../form";

const Nav = () => {
  return (
    <div className="flex items-center justify-between sticky top-0 py-4 bg-white z-50">
      <Image src={"/images/logo.png"} width={158} height={37} alt="logo" />

      <Form
        trigger={
          <DialogTrigger asChild>
            <Button
              size={"lg"}
              variant={"outline"}
              className="border border-[#0C2C43]"
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
