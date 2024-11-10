import { UserButton } from "@clerk/nextjs";
import { ProfileLoadingSkeleton } from "@/components/profile-loading-skeleton";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b gap-4">
      <Link href="/" className="text-2xl font-bold">
        Next Todos
      </Link>
      <div className="relative w-[28px] h-[28px]">
        <UserButton />
        <ProfileLoadingSkeleton />
      </div>
    </header>
  );
}
