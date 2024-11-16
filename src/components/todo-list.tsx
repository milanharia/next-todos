"use client";

import { CalendarIcon, CloseIcon, EditIcon } from "@/app/icons";
import { completeTodo, deleteTodo } from "@/server/actions";
import { todos } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SearchBar } from "./search-bar";

interface TodoListProps {
  todos: InferSelectModel<typeof todos>[];
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString();
}

type TodoProps = {
  todo: InferSelectModel<typeof todos>;
  onEdit: (id: InferSelectModel<typeof todos>["id"]) => void;
  onClose: (id: InferSelectModel<typeof todos>["id"]) => void;
  onComplete: (
    id: InferSelectModel<typeof todos>["id"],
    isCompleted: boolean
  ) => void;
};

function Todo(props: TodoProps) {
  const isCompleted = props.todo.completed;

  function onEdit() {
    props.onEdit(props.todo.id);
  }

  function onClose() {
    props.onClose(props.todo.id);
  }

  function onComplete() {
    props.onComplete(props.todo.id, !isCompleted);
  }

  return (
    <div
      className={`bg-slate-800 mb-4 p-4 rounded-md ${
        isCompleted ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between gap-4 items-center mb-2">
        <p className="font-semibold truncate">{props.todo.title}</p>
        {!isCompleted && (
          <div className="h-2 flex items-center gap-2">
            <button onClick={() => onEdit()}>
              <EditIcon />
            </button>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
      <hr className="mb-4" />
      <p className="mb-4">{props.todo.content}</p>

      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
        <p className="text-sm flex items-center gap-2">
          <CalendarIcon />
          <span>
            {formatDate(props.todo.updatedAt || props.todo.createdAt)}
          </span>
        </p>
        <button
          onClick={onComplete}
          className="block bg-blue-500 hover:bg-blue-700 text-white mr-auto xl:mr-0 text-left font-bold py-2 px-4 rounded"
        >
          Mark as {isCompleted ? "incomplete" : "complete"}
        </button>
      </div>
    </div>
  );
}

export function TodoList(props: TodoListProps) {
  const [todos, setTodos] = useState(props.todos);

  // Update the todo list when the props change (sync with server state)
  useEffect(() => {
    setTodos(props.todos);
  }, [props.todos]);

  function onComplete(id: number) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function onDelete(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <div className="md:hidden">
        <SearchBar />
      </div>
      <TodoColumn
        title="Todo List"
        todos={todos.filter((todo) => !todo.completed)}
        onComplete={onComplete}
        onDelete={onDelete}
        emptyMessage="Create a todo to get started"
      />
      <TodoColumn
        title="Completed"
        todos={todos.filter((todo) => todo.completed)}
        onComplete={onComplete}
        onDelete={onDelete}
        emptyMessage="View your completed todos here"
      />
    </div>
  );
}

function TodoColumn(props: {
  todos: InferSelectModel<typeof todos>[];
  title: string;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  emptyMessage?: string;
}) {
  const isListEmpty = props.todos.length === 0;
  const router = useRouter();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{props.title}</h2>
      <div>
        {isListEmpty && (
          <p className="text-slate-400">
            {props.emptyMessage || "No todos found"}
          </p>
        )}
        {!isListEmpty &&
          props.todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onEdit={(id) => {
                router.push(
                  `/edit/${id}?title=${todo.title}&content=${todo.content}`
                );
              }}
              onClose={async (id) => {
                props.onDelete(id);
                deleteTodo(id);
              }}
              onComplete={async (id) => {
                props.onComplete(id);
                const res = await completeTodo(id);
                if (res.status === "error") {
                  toast.error(res.message, { position: "bottom-center" });
                }
              }}
            />
          ))}
      </div>
    </div>
  );
}
