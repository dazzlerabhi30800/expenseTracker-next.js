import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const budgetTable = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  amount: integer("amount").notNull().default(0),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const expenseTable = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  amount: integer("amount").notNull().default(0),
  budgetId: integer("budgetId").references(() => budgetTable.id),
  createdAt: varchar("createdAt").notNull(),
});
