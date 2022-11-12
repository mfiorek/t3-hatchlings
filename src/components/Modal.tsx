import React, {
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Dialog } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  buttonLabel: string;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  setIsOpen,
  title,
  buttonLabel,
  children,
}) => {
  return (
    <Dialog
      as="div"
      className="relative z-10 text-neutral-50"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-700 p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title as="h3" className="text-2xl font-bold leading-6">
              {title}
            </Dialog.Title>
            {children}
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="mt-8 rounded bg-lime-700 px-3 py-1 font-semibold hover:bg-lime-600"
              >
                {buttonLabel}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
