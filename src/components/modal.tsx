"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/app/icons";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute max-h-[100vh] max-w-[100vw] bg-black/80 m-0 flex items-center justify-center"
      onClose={onDismiss}
      onClick={() => onDismiss()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 rounded-md relative"
      >
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-white"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")!
  );
}
