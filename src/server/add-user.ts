import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

// Add the user to database if does not exist
export async function addUserToDb() {
  const user = await currentUser();
  if (!user || !user?.id) return;

  const userExists = !!(await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, user.id),
  }));

  if (!userExists) {
    await db.insert(users).values({
      id: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl ?? undefined,
    });
  }
}
