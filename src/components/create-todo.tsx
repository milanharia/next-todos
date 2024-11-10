"use client";

import { useActionState, useEffect } from "react";
import { createTodo } from "@/server/actions";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/icons";
import { toast } from "sonner";

export function CreateTodo() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createTodo, {
    status: "idle",
    message: "",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Todo created successfully", { position: "bottom-center" });
      router.back();
    }
    if (state.status === "error") {
      toast.error(state.message, { position: "bottom-center" });
    }
  }, [state]);

  return (
    <div className="p-4 text-white max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Todo</h1>
      <form action={formAction}>
        <input
          required
          type="text"
          name="title"
          className="bg-slate-700 mb-4 p-4 rounded-md w-full"
          placeholder="Title"
        />
        <input
          type="text"
          name="content"
          className="bg-slate-700 mb-4 p-4 rounded-md w-full"
          placeholder="Content"
        />
        <div className="flex gap-4 items-center float-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            type="button"
            className=" text-white font-bold py-4 px-4 rounded mb-4 float-end"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-4"
          >
            <span className={isPending ? "opacity-0" : "opacity-100"}>
              Create Todo
            </span>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                isPending ? "block" : "hidden"
              }`}
            >
              <Spinner />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
