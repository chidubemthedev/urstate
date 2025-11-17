"use client";
import {
  Dialog,
  DialogContent,
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
import React, { useState } from "react";
import { addWaitlistEntry } from "@/firebase";
import Success from "@/components/success";

type Props = {
  trigger: React.ReactNode;
};

const Form = ({ trigger }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !phone.trim() || !role) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Optional: simple email check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const id = await addWaitlistEntry(
        name.trim(),
        email.trim(),
        phone.trim(),
        role
      );
      console.log("Added waitlist entry id:", id);
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      // store the role that was submitted so Success can render role-specific copy
      setSubmittedRole(role ?? null);
      setRole(undefined);
      // Close the form dialog and open the success dialog
      setOpen(false);
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      // Show simple alert on error (you can replace with UI later)
      alert("Failed to add you to the waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={(v) => setOpen(!!v)}>
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
          <form onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <Select value={role} onValueChange={(val) => setRole(val)}>
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
              <Button
                type="submit"
                size={"lg"}
                className="w-full h-12"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Secure my spot"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success dialog controlled from this component */}
      <Success
        open={successOpen}
        onOpenChange={(v) => setSuccessOpen(!!v)}
        role={submittedRole}
      />
    </>
  );
};

export default Form;
