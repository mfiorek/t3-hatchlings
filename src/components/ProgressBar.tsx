import Image from "next/image";

interface ProgressBarProps {
  size?: number;
  progress?: number;
  trackWidth?: number;
  indicatorWidth?: number;
  indicatorCap?: "round" | "inherit" | "butt" | "square";
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const {
    size = 250,
    progress = 0,
    trackWidth = 15,
    indicatorWidth = 15,
    indicatorCap = `round`,
    label,
  } = props;

  const center = size / 2;
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
  const dashArray = (2 * Math.PI * radius * 2) / 3;
  const dashOffset = (dashArray * ((100 - progress) / 100) * 2) / 3;

  return (
    <>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="rotate-[150deg]" style={{ width: size, height: size }}>
          <circle
            className="fill-transparent stroke-neutral-600"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={trackWidth}
            strokeDasharray={dashArray}
            strokeLinecap={indicatorCap}
          />
          <circle
            className="fill-transparent stroke-lime-600"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/Egg.webp"
            alt="Pokemon egg image"
            width={"100"}
            height={"100"}
            style={{ imageRendering: "pixelated" }}
            priority={true}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex text-4xl font-extrabold">
            <span>{label}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
