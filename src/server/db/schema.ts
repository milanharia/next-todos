import { relations } from "drizzle-orm";
import {
  boolean,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `next_todos_${name}`);

export const users = createTable("users", {
  id: varchar("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("image_url"),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export const todos = createTable("todos", {
  id: serial("id").primaryKey(),
  authorId: varchar("author_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title").notNull(),
  content: varchar("content").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.authorId],
    references: [users.id],
  }),
}));
