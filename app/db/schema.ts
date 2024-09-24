/** @format */

import {
  decimal,
  numeric,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `ai_${name}`);

export const User = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  totalCredit: decimal("totalCredit", { precision: 10, scale: 2 }).default(
    "10000"
  ),
});

export const AIOutput = pgTable("aioutput", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => User.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  templateUsed: text("templateused").notNull(),
  aiResponse: text("aiResponse").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const purchase = pgTable("purchase", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  credit: numeric("credit", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stripeCustomer = pgTable("stripe_customer", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull().unique(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 256 })
    .notNull()
    .unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
