import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-5xl mb-16">Next Todos</h1>
      <SignInButton>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded mb-4">
          Login
        </button>
      </SignInButton>
      <p>
        Don&apos;t have an account?{" "}
        <SignUpButton>
          <span className="hover:underline cursor-pointer">Sign up</span>
        </SignUpButton>
      </p>
    </main>
  );
}