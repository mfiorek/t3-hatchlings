import { useEffect, useState } from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import ProgressBar from "../components/ProgressBar";
import TimeButton from "../components/TimeButton";
import Timer from "../components/Timer";
import { trpc } from "../utils/trpc";
import Content from "../components/Content";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  const [selectedTime, setSelectedTime] = useState(300);
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date>();

  const [modalVariant, setModalVariant] = useState<
    | null
    | "stopped"
    | "leaveWindow"
    | "successNewHatched"
    | "successAlreadyHatched"
  >(null);
  const [hatchlingId, setHatchlingId] = useState<number>();

  const { mutate: addHatchling } =
    trpc.hatchling.addRandomHatchling.useMutation();

  useEffect(() => {
    const onLeave = () => {
      if (expiryTimestamp) {
        console.log("It was started so you loose... BOOM.", expiryTimestamp);
        setExpiryTimestamp(undefined);
        setModalVariant("leaveWindow");
      } else {
        console.log("It was not started so it is ok for you to leave.");
      }
    };
    // Previously "visibilitychange"
    window.addEventListener("blur", onLeave);
    return () => window.removeEventListener("blur", onLeave);
  }, [expiryTimestamp]);

  const { data, isLoading } = trpc.hatchling.getHatchlings.useQuery();
  if (isLoading || !data) {
    return (
      <Content>
        <Loader text="Loading..." />
      </Content>
    );
  }

  const handleSucces = () => {
    setExpiryTimestamp(undefined);
    const hatchlingId = Math.ceil(Math.random() * 1) + 1;
    setHatchlingId(hatchlingId);
    const isHatchedAlready = data.some(
      (hatchling) => hatchling.hatchlingId === hatchlingId.toString()
    );
    if (isHatchedAlready) {
      setModalVariant("successAlreadyHatched");
    } else {
      setModalVariant("successNewHatched");
      addHatchling({
        hatchlingId: hatchlingId.toString(),
      });
    }
  };

  return (
    <Content>
      <div className="flex w-full grow flex-col items-center justify-center gap-16 py-8">
        <div className="flex flex-col items-center gap-8">
          {expiryTimestamp ? (
            <>
              <Timer
                expiryTimestamp={expiryTimestamp}
                onExpire={handleSucces}
                selectedTime={selectedTime}
              />
              <button
                className="rounded bg-red-400 px-3 py-1 text-xl font-bold"
                onClick={() => {
                  setExpiryTimestamp(undefined);
                  setModalVariant("stopped");
                }}
              >
                Stop
              </button>
            </>
          ) : (
            <>
              <ProgressBar
                progress={100}
                label={`00:${
                  selectedTime / 60 <= 9
                    ? `0${selectedTime / 60}`
                    : selectedTime / 60
                }:00`}
              />
              <button
                className="rounded bg-emerald-600 px-3 py-1 text-xl font-bold hover:bg-emerald-500"
                onClick={() => {
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
            {/* <TimeButton
              text="5s"
              setSelectedTime={() => setSelectedTime(5)}
              isSelected={selectedTime === 5}
              isDisabled={!!expiryTimestamp}
            /> */}
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
              text="25 min"
              setSelectedTime={() => setSelectedTime(1500)}
              isSelected={selectedTime === 1500}
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
      <Modal
        variant={modalVariant}
        setVariant={setModalVariant}
        hatchlingId={hatchlingId}
      />
    </Content>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
