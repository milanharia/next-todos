import "server-only";

import { db } from "@/server/db";
import { getCurrentUserOrThrow } from "./utils";

export async function getTodos() {
  const user = await getCurrentUserOrThrow();
  const todos = await db.query.todos.findMany({
    where: (model, { eq }) => eq(model.authorId, user.id),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return todos;
}
