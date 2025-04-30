"use client";
import { ReactNode, useRef } from "react";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6"
        tabIndex={-1}
      >
        {children}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
