import { TodoForm } from "@/components/todo-form";
import { Header } from "@/components/header";

export default async function EditTodoModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Header />
      <TodoForm id={Number(params.id)} />
    </>
  );
}
