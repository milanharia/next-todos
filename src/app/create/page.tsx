import { TodoForm } from "@/components/todo-form";
import { Header } from "@/components/header";
import { Suspense } from "react";

export default function CreateTodoPage() {
  return (
    <>
      <Header />
      <Suspense>
        <TodoForm />
      </Suspense>
    </>
  );
}
