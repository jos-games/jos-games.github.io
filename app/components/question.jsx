import "../globals.css";
import Image from "next/image";
import {useState} from "react";

export default function Question({ question }) {

  const [attempt, setAttempt] = useState("");
  const [isAttemptWrong, setIsAttemptWrong] = useState(false);
  const [isQuestionCleared, setIsQuestionCleared] = useState(false);

  const tryAttempt = () => {
    console.log("try attempt");
    if(question["answer"].toLowerCase().replace(/\s/g, '') === attempt.toLowerCase().replace(/\s/g, '')) {
      setIsQuestionCleared(true);
    } else {
      setIsAttemptWrong(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8 -mt-24">
      <div className={"flex flex-col gap-12"}>
        { !isQuestionCleared ?
          <>
            <div className={"flex items-center gap-6"}>
              <Image
                src="/clipboard-icon.png"
                alt="clipboard"
                width={60}
                height={60}
                priority
              />
              <div className="w-fit mx-auto">
                <h1 className="roboto-mono-bold text-4xl text-left">Checkpoint</h1>
              </div>
            </div>
            <div className={"text-left flex flex-col gap-6"}>
              <p>{question["prompt"].toUpperCase()}</p>
              <div className="relative flex gap-2 w-full max-w-md bg-zinc-600 p-2 rounded-full">
                <Image
                  src="/question-mark.png"
                  alt="question mark"
                  width={25}
                  height={25}
                  className={"max-w-[25px] max-h-[25px]"}
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
              { isAttemptWrong ? <p className={"text-red-500"}>Try Again!</p> : <></> }
            </div>
          </> :
          <>
            <div className={"flex items-center gap-6"}>
              <Image
                src="/cheer.png"
                alt="cheer"
                width={60}
                height={60}
                priority
              />
              <div className="w-fit mx-auto">
                <h1 className="roboto-mono-bold text-4xl text-left">Success</h1>
              </div>
            </div>
            <div className={"text-left flex flex-col gap-6"}>
              {
                question["reward"].split("\\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br/>
                    </span>
                  )
                })
              }
            </div>
          </>
        }
      </div>
    </div>
  );
}