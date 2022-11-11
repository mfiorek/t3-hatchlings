import React from "react";

interface TimeButtonProps {
  text: string;
  setSelectedTime: (time: number) => void;
  isSelected: boolean;
  isDisabled: boolean;
}

const TimeButton: React.FC<TimeButtonProps> = ({
  text,
  setSelectedTime,
  isSelected,
  isDisabled,
}) => {
  return (
    <button
      onClick={() => setSelectedTime(1800)}
      className={`rounded bg-neutral-500 px-3 py-1 hover:bg-neutral-400
        disabled:bg-opacity-60 disabled:hover:bg-neutral-500 disabled:hover:bg-opacity-60 ${
          isSelected &&
          "bg-lime-600 hover:bg-lime-600 disabled:hover:bg-lime-600"
        }`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default TimeButton;
