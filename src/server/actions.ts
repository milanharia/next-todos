"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTodo(_initialState: any, data: FormData) {
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
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
}
