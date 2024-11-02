import { UserButton } from "@clerk/nextjs";
import { ProfileLoadingSkeleton } from "@/components/profile-loading-skeleton";

export default function HomePage() {
  return (
    <main className="h-screen w-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl">Next Todos</h1>
        <div className="relative w-[28px] h-[28px]">
          <UserButton />
          <ProfileLoadingSkeleton />
        </div>
      </header>
      <section className="flex items-center justify-center">
        <p>main content</p>
      </section>
    </main>
  );
}
