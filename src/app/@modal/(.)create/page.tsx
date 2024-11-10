import { CreateTodo } from "@/components/create-todo";
import { Modal } from "@/components/modal";

export default async function CreateTodoModal() {
  return (
    <Modal>
      <CreateTodo />
    </Modal>
  );
}
