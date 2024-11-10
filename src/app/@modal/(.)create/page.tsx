import { TodoForm } from "@/components/todo-form";
import { Modal } from "@/components/modal";

export default async function CreateTodoModal() {
  return (
    <Modal>
      <TodoForm />
    </Modal>
  );
}
