import Image from "next/image";

const Trio = () => {
  return (
    <div className="grid grid-cols-2 gap-6 items-center justify-center">
      <div className="shadow-[0_0_5px_0_#00000024] h-full flex flex-col justify-center px-5 space-y-10">
        <div className="">
          <h1 className="text-[#333333] text-[22px] leading-8 font-bold">
            For Renters
          </h1>
          <p className="text-[#777777] text-sm leading-5">
            Find verified homes. Pay rent with confidence. Build your rental
            trust score.
          </p>
        </div>
        <div>
          <h1 className="text-[#333333] text-[22px] leading-8 font-bold">
            For Property Owners
          </h1>
          <p className="text-[#777777] text-sm leading-5">
            Secure payments. Verified renters. Clear documentation — zero
            hassle.
          </p>
        </div>
        <div>
          <h1 className="text-[#333333] text-[22px] leading-8 font-bold">
            For Property Managers
          </h1>
          <p className="text-[#777777] text-sm leading-5">
            Manage multiple units with ease. Track rent and payments in one
            flow.
          </p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-6">
          <Image
            src={"/images/olumide.png"}
            width={372}
            height={96}
            alt="beach house"
          />
          <Image
            src={"/images/tour.png"}
            width={372}
            height={250}
            alt="beach house"
          />
        </div>
        <Image
          src={"/images/apply.png"}
          width={283}
          height={355}
          alt="beach house"
        />
      </div>
    </div>
  );
};

export default Trio;
