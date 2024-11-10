import { TodoForm } from "@/components/todo-form";
import { Modal } from "@/components/modal";
import { Suspense } from "react";

export default async function CreateTodoModal() {
  return (
    <Modal>
      <Suspense>
        <TodoForm />
      </Suspense>
    </Modal>
  );
}
