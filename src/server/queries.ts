import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";

export async function getTodos() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const todos = await db.query.todos.findMany({
    where: (model, { eq }) => eq(model.authorId, user.id),
  });

  return todos;
}
