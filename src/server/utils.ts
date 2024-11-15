import { auth } from "@/server/auth";

export async function getCurrentUserOrThrow() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  type TUser = typeof user & { id: string };
  return user as TUser;
}
