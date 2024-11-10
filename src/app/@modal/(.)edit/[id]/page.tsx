import { TodoForm } from "@/components/todo-form";
import { Modal } from "@/components/modal";
import { Suspense } from "react";

export default async function EditTodoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Modal>
      <Suspense>
        <TodoForm id={+id} />
      </Suspense>
    </Modal>
  );
}
