import { Suspense } from "react";
import Link from "next/link";
import { TodoList } from "@/components/todo-list";
import { getTodos } from "@/server/queries";
import { Header } from "@/components/header";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { SearchBar } from "@/components/search-bar";
import { PlusIcon, Spinner } from "./icons";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return (
    <main className="h-screen">
      <Header />
      <section className="md:grid flex flex-col grid-cols-[minmax(200px,350px)_1fr] md:gap-4 h-[calc(100vh-73px)]">
        <div className="hidden md:block p-4 md:border-r ">
          <Link
            href="/create"
            className="flex items-center gap-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded mb-4 w-full text-left"
          >
            <PlusIcon />
            Create Todo
          </Link>
          <SearchBar />
        </div>
        <div className=" overflow-y-scroll p-4 flex-1">
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
        <div className="p-4 border-t block md:hidden">
          <Link
            href="/create"
            className="flex items-center gap-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded w-full text-left"
          >
            <PlusIcon />
            Create Todo
          </Link>
        </div>
      </section>
    </main>
  );
}

async function TodoSection() {
  const todos = await getTodos();

  return <TodoList todos={todos} />;
}
