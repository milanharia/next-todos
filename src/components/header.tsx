import { auth, signOut } from "@/server/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth();
  return (
    <header className=" bg-black flex items-center justify-between p-4 border-b gap-4">
      <Link href="/" className="text-2xl font-bold">
        Next Todos
      </Link>
      <div className="flex items-center gap-4 md:gap-8">
        {session?.user && (
          <div className="flex items-center gap-2">
            <img
              src={session?.user?.image || "/avatar.svg"}
              className="w-8 h-8 rounded-full"
              alt={`${session?.user?.name}'s profile picture`}
            />

            <p className="hidden sm:block font-semibold ">
              {session?.user?.name}
            </p>
          </div>
        )}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-500 transition text-white font-bold py-2 px-4 rounded"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
