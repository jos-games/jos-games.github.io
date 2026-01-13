import "../globals.css";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen py-8 -mt-24">
      <div className={"flex flex-col gap-12"}>
        <div className={"flex items-center gap-6"}>
          <h1 className={"text-xl"}>Please Wait While We Get Things Ready
            <span className="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span>
          </h1>
        </div>
      </div>
    </div>
  );
}