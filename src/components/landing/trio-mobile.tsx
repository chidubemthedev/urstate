import Image from "next/image";

const TrioMobile = () => {
  return (
    <div className="flex flex-col md:hidden gap-6 items-center justify-center">
      <div className="flex flex-col gap-4 px-2.5">
        <Image
          src={"/images/promise.png"}
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

      <div className="shadow-[0_0_5px_0_#00000024] h-full flex flex-col justify-center px-5 py-12 space-y-10 text-center">
        <div className="">
          <h1 className="text-[#333333] text-[18px] leading-6 font-bold">
            For Renters
          </h1>
          <p className="text-[#777777] text-xs leading-[18px]">
            Find verified homes. Pay rent with confidence. Build your rental
            trust score.
          </p>
        </div>
        <div>
          <h1 className="text-[#333333] text-[18px] leading-6 font-bold">
            For Property Owners
          </h1>
          <p className="text-[#777777] text-xs leading-[18px]">
            Secure payments. Verified renters. Clear documentation — zero
            hassle.
          </p>
        </div>
        <div>
          <h1 className="text-[#333333] text-[18px] leading-6 font-bold">
            For Property Managers/Agents
          </h1>
          <p className="text-[#777777] text-xs leading-[18px]">
            Manage multiple units with ease. Track rent and payments in one
            flow.
          </p>
        </div>
      </div>

      <div className="px-2.5">
        <Image
          src={"/images/apply.png"}
          width={283}
          height={355}
          alt="beach house"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default TrioMobile;
