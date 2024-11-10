"use client";

import { CalendarIcon, CloseIcon, EditIcon } from "@/app/icons";
import { todos } from "@/server/db/schema";
import { InferSelectModel } from "drizzle-orm";

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
  isCompleted?: boolean;
};

function Todo(props: TodoProps) {
  function onEdit() {
    props.onEdit(props.todo.id);
  }

  function onClose() {
    props.onClose(props.todo.id);
  }

  return (
    <div
      className={`bg-slate-800 mb-4 p-4 rounded-md ${
        props.isCompleted ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between gap-4 items-center mb-2">
        <p className="font-semibold truncate">{props.todo.title}</p>
        {!props?.isCompleted && (
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

      <p className="text-sm flex items-center gap-2">
        <CalendarIcon />
        <span>{formatDate(props.todo.updatedAt || props.todo.createdAt)}</span>
      </p>
    </div>
  );
}

export function TodoList(props: TodoListProps) {
  return (
    <div className="grid grid-cols-2 gap-8 w-full">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Todo List</h2>

        <div>
          {props.todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onEdit={(id) => {
                console.log(id);
              }}
              onClose={(id) => {
                console.log(id);
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed</h2>
        </div>
        <div>
          {props.todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              isCompleted
              onEdit={(id) => {
                console.log(id);
              }}
              onClose={(id) => {
                console.log(id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
