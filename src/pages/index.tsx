import { type NextPage } from "next";
import { useEffect, useState } from "react";
import TimeButton from "../components/TimeButton";
import Timer from "../components/Timer";

const Home: NextPage = () => {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(300);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date>();

  useEffect(() => {
    const onLeave = () => {
      if (expiryTimestamp) {
        console.log("It was started so you loose... BOOM.", expiryTimestamp);
        setExpiryTimestamp(undefined);
        setIsInterrupted(true);
      } else {
        console.log("It was not started so it is ok for you to leave.");
      }
    };
    // Previously "visibilitychange"
    window.addEventListener("blur", onLeave);
    return () => window.removeEventListener("blur", onLeave);
  }, [expiryTimestamp]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-neutral-800 text-neutral-50">
      <h1 className="text-5xl font-extrabold">t3-hatchlings</h1>
      <h1 className="text-4xl font-extrabold">Score: {score}</h1>
      {message && <h1 className="text-4xl font-extrabold">{message}</h1>}
      {isInterrupted && (
        <>
          <h1 className="text-4xl font-extrabold">You left the window 😥</h1>
          <h1 className="text-4xl font-extrabold">The hatchling died... ☠</h1>
        </>
      )}
      <div className="flex flex-col items-center gap-2">
        {expiryTimestamp ? (
          <>
            <Timer
              expiryTimestamp={expiryTimestamp}
              onExpire={() => {
                setExpiryTimestamp(undefined);
                setScore(score + 1);
                setMessage("Congrats! 🎁");
              }}
            />
            <button
              className="rounded bg-red-400 px-3 py-1 text-xl font-bold"
              onClick={() => {
                setExpiryTimestamp(undefined);
                setMessage("You stoped 😥");
              }}
            >
              Stop
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold">
              00:
              {selectedTime / 60 <= 9
                ? `0${selectedTime / 60}`
                : selectedTime / 60}
              :00
            </h1>
            <button
              className="rounded bg-emerald-600 px-3 py-1 text-xl font-bold hover:bg-emerald-500"
              onClick={() => {
                setMessage("");
                setIsInterrupted(false);
                const time = new Date();
                time.setSeconds(time.getSeconds() + selectedTime);
                setExpiryTimestamp(time);
              }}
            >
              Start
            </button>
          </>
        )}

        <div className="flex gap-2">
          <TimeButton
            text="5s"
            setSelectedTime={() => setSelectedTime(5)}
            isSelected={selectedTime === 5}
            isDisabled={!!expiryTimestamp}
          />
          <TimeButton
            text="5 min"
            setSelectedTime={() => setSelectedTime(300)}
            isSelected={selectedTime === 300}
            isDisabled={!!expiryTimestamp}
          />
          <TimeButton
            text="10 min"
            setSelectedTime={() => setSelectedTime(600)}
            isSelected={selectedTime === 600}
            isDisabled={!!expiryTimestamp}
          />
          <TimeButton
            text="15 min"
            setSelectedTime={() => setSelectedTime(900)}
            isSelected={selectedTime === 900}
            isDisabled={!!expiryTimestamp}
          />
          <TimeButton
            text="20 min"
            setSelectedTime={() => setSelectedTime(1200)}
            isSelected={selectedTime === 1200}
            isDisabled={!!expiryTimestamp}
          />
          <TimeButton
            text="30 min"
            setSelectedTime={() => setSelectedTime(1800)}
            isSelected={selectedTime === 1800}
            isDisabled={!!expiryTimestamp}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
