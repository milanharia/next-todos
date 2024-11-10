"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createTodo(
  _initialState: {
    status: string;
    message: string;
  },
  data: FormData
) {
  try {
    const schema = z.object({
      title: z.string().min(1),
      content: z.string().nullable(),
    });
    const parse = schema.safeParse({
      title: data.get("title"),
      content: data.get("content"),
    });

    if (!parse.success) {
      return {
        status: "error",
        message: "Title is required",
      };
    }

    const { title, content } = parse.data;
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    await db.insert(todos).values({
      authorId: user.id,
      title,
      content,
    });

    revalidatePath("/");
    return { status: "success", message: "Todo created successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function completeTodo(todoId: number) {
  try {
    const schema = z.object({
      id: z.number(),
    });
    const parse = schema.safeParse({
      id: todoId,
    });

    if (!parse.success) {
      return {
        status: "error",
        message: "Id is required",
      };
    }

    const { id } = parse.data;

    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isUsersTodo = await db.query.todos.findFirst({
      where: (todo, { eq, and }) =>
        and(eq(todo.authorId, user.id), eq(todo.id, id)),
    });
    if (!isUsersTodo) {
      throw new Error("Unauthorized");
    }
    await db.update(todos).set({ completed: true }).where(eq(todos.id, id));

    revalidatePath("/");
    return { status: "success", message: "Todo completed successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function deleteTodo(todoId: number) {
  try {
    const schema = z.object({
      id: z.number(),
    });
    const parse = schema.safeParse({
      id: todoId,
    });

    if (!parse.success) {
      return {
        status: "error",
        message: "Id is required",
      };
    }

    const { id } = parse.data;

    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isUsersTodo = await db.query.todos.findFirst({
      where: (todo, { eq, and }) =>
        and(eq(todo.authorId, user.id), eq(todo.id, id)),
    });

    if (!isUsersTodo) {
      throw new Error("Unauthorized");
    }

    await db.delete(todos).where(eq(todos.id, id));

    revalidatePath("/");
    return { status: "success", message: "Todo deleted successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}

export async function updateTodo(
  _initialState: {
    status: string;
    message: string;
  },
  data: FormData
) {
  try {
    const schema = z.object({
      id: z.number(),
      title: z.string().min(1),
      content: z.string().nullable(),
    });
    const parse = schema.safeParse({
      id: Number(data.get("id")),
      title: data.get("title"),
      content: data.get("content"),
    });

    if (!parse.success) {
      console.log(parse.error.issues);
      return {
        status: "error",
        message: "The provided data is invalid",
      };
    }

    const { id, title, content } = parse.data;
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const isUsersTodo = await db.query.todos.findFirst({
      where: (todo, { eq, and }) =>
        and(eq(todo.authorId, user.id), eq(todo.id, id)),
    });

    if (!isUsersTodo) {
      throw new Error("Unauthorized");
    }

    await db.update(todos).set({ title, content }).where(eq(todos.id, id));

    revalidatePath("/");
    return { status: "success", message: "Todo updated successfully" };
  } catch {
    return { status: "error", message: "Something went wrong" };
  }
}
