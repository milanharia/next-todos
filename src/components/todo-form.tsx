"use client";

import { useActionState, useEffect } from "react";
import { createTodo, updateTodo } from "@/server/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/app/icons";
import { toast } from "sonner";

export function TodoForm(props: { id?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(
    props.id ? updateTodo : createTodo,
    {
      status: "idle",
      message: "",
    }
  );

  const title = searchParams.get("title");
  const content = searchParams.get("content");

  useEffect(() => {
    if (state.status === "success") {
      toast.success(
        props.id ? "Todo edited successfully" : "Todo created successfully",
        { position: "bottom-center" }
      );
      router.back();
    }
    if (state.status === "error") {
      toast.error(state.message, { position: "bottom-center" });
    }
  }, [state]);

  return (
    <div className="p-4 text-white max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {props.id ? "Edit Todo" : "Create Todo"}
      </h1>
      <form action={formAction}>
        <input type="hidden" name="id" value={props.id} />
        <label htmlFor="title" className="block mb-2">
          Title
        </label>
        <input
          required
          type="text"
          name="title"
          className="bg-slate-700 mb-4 p-4 rounded-md w-full"
          placeholder="Title"
          defaultValue={props.id && title ? title : ""}
        />
        <label htmlFor="content" className="block mb-2">
          Description (optional)
        </label>
        <input
          type="text"
          name="content"
          className="bg-slate-700 mb-4 p-4 rounded-md w-full"
          placeholder="Description"
          defaultValue={props.id && content ? content : ""}
        />
        <div className="flex gap-4 items-center float-end mt-2">
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
              Submit
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
