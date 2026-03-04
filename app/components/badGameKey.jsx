import Image from "next/image";
import "../globals.css";

export default function BadGameKey() {

  return (
    <div className="flex items-center justify-center min-h-screen py-8 -mt-24">
      <div className={"flex flex-col gap-12"}>
        <div className={"flex items-center gap-6"}>
          <Image
            src="/lock.png"
            alt="Next.js logo"
            width={60}
            height={60}
            priority
          />
          <div className="w-fit mx-auto">
            <h1 className="roboto-mono-bold text-4xl text-left">ERROR!</h1>
          </div>
        </div>
        <div className={"flex flex-col gap-6"}>
          <p className={"truncate text-[clamp(1rem,4vw,3rem)]"}>
            Please verify your game key
            <span className="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span>
          </p>
        </div>
      </div>
    </div>

  );
}