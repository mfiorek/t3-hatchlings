import React, { type Dispatch, type SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import pokemonArray from "../utils/pokemonArray";

interface ModalProps {
  variant:
    | null
    | "stopped"
    | "leaveWindow"
    | "successNewHatched"
    | "successAlreadyHatched";
  setVariant: Dispatch<
    SetStateAction<
      | null
      | "stopped"
      | "leaveWindow"
      | "successNewHatched"
      | "successAlreadyHatched"
    >
  >;
  hatchlingId?: number;
}

const Modal: React.FC<ModalProps> = ({ variant, setVariant, hatchlingId }) => {
  const getTitle = () => {
    if (variant === "stopped" || variant === "leaveWindow") {
      return "Oh!";
    }
    if (variant === "successAlreadyHatched") {
      return "Congrats! But...";
    }
    return "Congrats!";
  };

  const getButtonLabel = () => {
    if (variant === "stopped") {
      return "Ok";
    }
    if (variant === "leaveWindow") {
      return "I'm sorry...";
    }
    if (variant === "successAlreadyHatched") {
      return "I get it 🤷‍♂️";
    }
    return "Thanks!";
  };

  const getContents = () => {
    if (variant === "stopped") {
      return (
        <div className="flex flex-col items-center">
          <p className="text-xl">You stopped 😥</p>
          <p className="text-xl">The hatchling did not hatch yet...</p>
        </div>
      );
    }
    if (variant === "leaveWindow") {
      return (
        <div className="flex flex-col items-center">
          <p className="text-xl">You left the window 😥</p>
          <p className="text-xl">The hatchling died... ☠</p>
        </div>
      );
    }
    if (variant === "successAlreadyHatched") {
      return (
        <div className="flex flex-col items-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${hatchlingId}.png`}
            alt="Pokemon image"
            width={"150"}
            height={"150"}
            style={{ imageRendering: "pixelated" }}
            priority={true}
          />

          <p>
            <span className="font-semibold capitalize">
              {pokemonArray.find((pokekon) => pokekon.id === hatchlingId)?.name}
            </span>
            <span> is already in your colection...</span>
          </p>
          <p>Better luck next time!</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${hatchlingId}.png`}
          alt="Pokemon image"
          width={"150"}
          height={"150"}
          style={{ imageRendering: "pixelated" }}
          priority={true}
        />
        <p>
          <span className="font-semibold capitalize">
            {pokemonArray.find((pokekon) => pokekon.id === hatchlingId)?.name}
          </span>
          <span> has been added to your colection! 🎁</span>
        </p>
      </div>
    );
  };

  return (
    <Dialog
      as="div"
      className="relative z-10 text-neutral-50"
      open={!!variant}
      onClose={() => setVariant(null)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-700 p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title as="h3" className="text-2xl font-bold leading-6">
              {getTitle()}
            </Dialog.Title>
            {getContents()}
            <div className="flex justify-end">
              <button
                onClick={() => setVariant(null)}
                className="mt-8 rounded bg-lime-700 px-3 py-1 font-semibold hover:bg-lime-600"
              >
                {getButtonLabel()}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
