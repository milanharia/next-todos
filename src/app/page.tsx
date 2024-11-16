import { TodoList } from "@/components/todo-list";
import Link from "next/link";
import { getTodos } from "@/server/queries";
import { Header } from "@/components/header";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Spinner } from "./icons";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return (
    <main>
      <Header />
      <section className="grid grid-cols-12 gap-4 min-h-[calc(100vh-65px)]">
        <div className="col-span-3 p-4 border-r ">
          <Link
            href="/create"
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-4 w-full text-left"
          >
            Create Todo
          </Link>
          <input
            type="text"
            className="bg-slate-800 mb-4 p-4 rounded-md w-full"
            placeholder="Search todos..."
          />
        </div>
        <div className="col-span-9 overflow-y-scroll p-4">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <Spinner />
              </div>
            }
          >
            <TodoSection />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

export async function TodoSection() {
  const todos = await getTodos();

  return <TodoList todos={todos} />;
}
