import React from "react";
import { useTimer } from "react-timer-hook";

interface TimerProps {
  expiryTimestamp: Date;
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ expiryTimestamp, onExpire }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <div className="flex text-4xl font-extrabold">
      <span>{hours <= 9 ? `0${hours}` : hours}</span>:
      <span>{minutes <= 9 ? `0${minutes}` : minutes}</span>:
      <span>{seconds <= 9 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default Timer;
