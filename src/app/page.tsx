import { UserButton } from "@clerk/nextjs";
import { ProfileLoadingSkeleton } from "@/components/profile-loading-skeleton";
import { addUserToDb } from "@/server/actions";
import { TodoList } from "@/components/todo-list";

const mockTodos = [
  {
    id: 1,
    authorId: "author",
    title: "Todo 1",
    content: "Todo 1 content",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    authorId: "author",
    title: "Todo 2",
    content: "Todo 2 content",
    completed: false,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 3,
    authorId: "author",
    title: "Todo 3",
    content: "Todo 3 content",
    completed: false,
    createdAt: new Date(),
    updatedAt: null,
  },
];

export default async function HomePage() {
  await addUserToDb();

  return (
    <main className="h-screen w-screen">
      <header className="flex items-center justify-between p-4 border-b mb-4">
        <h1 className="text-2xl">Next Todos</h1>
        <div className="relative w-[28px] h-[28px]">
          <UserButton />
          <ProfileLoadingSkeleton />
        </div>
      </header>
      <section className="flex items-center justify-center">
        <TodoList todos={mockTodos} />
      </section>
    </main>
  );
}
