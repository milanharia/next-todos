import { TodoForm } from "@/components/todo-form";
import { Header } from "@/components/header";

export default async function EditTodoModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <>
      <Header />
      <TodoForm id={+id} />
    </>
  );
}
