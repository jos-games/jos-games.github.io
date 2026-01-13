import Image from "next/image";
import "../globals.css";
import {useState} from "react";

export default function Login({ validPasswords, onValidPassword }) {

  const [attempt, setAttempt] = useState("");
  const [isAttemptWrong, setIsAttemptWrong] = useState(false);

  const tryAttempt = () => {
    if(validPasswords.some(validPassword => validPassword === attempt)) {
      onValidPassword(attempt);
    } else {
      setIsAttemptWrong(true);
    }
  }

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
            <h1 className="roboto-mono-bold text-4xl text-left">Hold Up!</h1>
          </div>
        </div>
        <div className={"flex flex-col gap-6"}>
          <p className={"truncate text-[clamp(1rem,4vw,3rem)]"}>
            Enter your Game Key to Begin
            <span className="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span>
          </p>
          <div className="relative flex gap-2 w-full max-w-md bg-zinc-600 p-2 rounded-full">
            <Image
              src="/key.png"
              alt="Key"
              width={25}
              height={25}
              priority
            />
            <input className={"flex-1 outline-none"}
              value={attempt}
              onChange={e => setAttempt(e.target.value.toLowerCase())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  tryAttempt();
                }
              }}
            />
            <button>
              <Image src="/circle-next.png"
                     alt={"proceed"}
                     width={25}
                     height={25}
                     onClick={tryAttempt}
              />
            </button>
          </div>
          { isAttemptWrong ? <p className={"text-red-500"}>Invalid Password</p> : <></> }
        </div>
      </div>
    </div>

  );
}