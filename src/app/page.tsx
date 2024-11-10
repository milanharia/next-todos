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
    <main className="">
      <header className="flex items-center justify-between p-4 border-b gap-4">
        <h1 className="text-2xl">Next Todos</h1>
        <div className="relative w-[28px] h-[28px]">
          <UserButton />
          <ProfileLoadingSkeleton />
        </div>
      </header>
      <section className="grid grid-cols-12 gap-4 min-h-[calc(100vh-65px)]">
        <div className="col-span-3 p-4 border-r ">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-4 w-full text-left">
            Create Todo
          </button>
          <input
            type="text"
            className="bg-slate-800 mb-4 p-4 rounded-md w-full"
            placeholder="Search todos..."
          />
        </div>
        <div className="col-span-9 overflow-y-scroll p-4">
          <TodoList todos={mockTodos} />
        </div>
      </section>
    </main>
  );
}
