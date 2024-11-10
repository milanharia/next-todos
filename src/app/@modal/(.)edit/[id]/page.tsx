import { TodoForm } from "@/components/todo-form";
import { Modal } from "@/components/modal";

export default async function EditTodoModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <Modal>
      <TodoForm id={+id} />
    </Modal>
  );
}
