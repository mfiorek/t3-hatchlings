import React from "react";
import { useTimer } from "react-timer-hook";
import ProgressBar from "./ProgressBar";

interface TimerProps {
  expiryTimestamp: Date;
  onExpire: () => void;
  selectedTime: number;
}

const Timer: React.FC<TimerProps> = ({
  expiryTimestamp,
  onExpire,
  selectedTime,
}) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <ProgressBar
        progress={
          (100 * (expiryTimestamp.getTime() - new Date().getTime())) /
          (selectedTime * 1000)
        }
        label={`${hours <= 9 ? `0${hours}` : hours}:${
          minutes <= 9 ? `0${minutes}` : minutes
        }:${seconds <= 9 ? `0${seconds}` : seconds}`}
      />
    </div>
  );
};

export default Timer;
