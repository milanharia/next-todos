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
      className="absolute h-screen w-screen bg-black/80 flex items-center justify-center"
      onClose={onDismiss}
    >
      <div className="bg-slate-800 rounded-md relative">
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
