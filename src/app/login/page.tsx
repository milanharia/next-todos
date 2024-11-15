import { redirect } from "next/navigation";
import { auth, signIn } from "@/server/auth";
import { GoogleSignInButton } from "@/components/google-sign-in-button";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-5xl mb-16">Next Todos</h1>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <GoogleSignInButton />
      </form>
    </main>
  );
}
