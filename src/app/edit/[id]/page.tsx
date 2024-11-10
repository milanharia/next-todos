import { TodoForm } from "@/components/todo-form";
import { Header } from "@/components/header";
import { Suspense } from "react";

export default async function EditTodoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Header />
      <Suspense>
        <TodoForm id={+id} />
      </Suspense>
    </>
  );
}
