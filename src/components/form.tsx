import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

type Props = {
  trigger: React.ReactNode;
};

const Form = ({ trigger }: Props) => {
  return (
    <Dialog>
      {trigger}
      <DialogContent className="md:px-[136px] md:py-[100px] md:min-w-[670px]">
        <DialogHeader>
          <DialogTitle className="text-[#0C2C43] font-bold text-[38px] leading-10 text-center">
            Join our wait list
          </DialogTitle>
          <p className="text-[#777777] text-base leading-6 text-center">
            Be among the first people to experience Urstate.
          </p>
        </DialogHeader>
        <div className="grid gap-6 mt-10">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-[#333333] text-base leading-6"
            >
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue=""
              placeholder="Tell us your name"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="text-[#333333] text-base leading-6"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              defaultValue=""
              placeholder="youremail@email.com"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="number"
              className="text-[#333333] text-base leading-6"
            >
              Phone Number
            </Label>
            <Input
              id="number"
              name="number"
              defaultValue=""
              placeholder="Enter your phone number"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="role"
              className="text-[#333333] text-base leading-6"
            >
              Role
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="renter">Renter</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="mt-10">
          <Button type="submit" size={"lg"} className="w-full h-12">
            Secure my spot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
