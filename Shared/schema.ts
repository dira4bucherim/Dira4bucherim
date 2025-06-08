import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const apartments = pgTable("apartments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  neighborhood: text("neighborhood").notNull(),
  city: text("city").notNull(),
  price: integer("price").notNull(), // in ILS per month
  rooms: integer("rooms").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  area: integer("area"), // in square meters
  images: text("images").array().notNull().default([]),
  videoUrl: text("video_url"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  amenities: text("amenities").array().notNull().default([]),
  nearbyYeshivot: text("nearby_yeshivot").array().notNull().default([]),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  securityDeposit: integer("security_deposit"), // in ILS
  furnished: boolean("furnished").notNull().default(false),
  parking: boolean("parking").notNull().default(false),
  petFriendly: boolean("pet_friendly").notNull().default(false),
});

export const insertApartmentSchema = createInsertSchema(apartments).omit({
  id: true,
});

export type InsertApartment = z.infer<typeof insertApartmentSchema>;
export type Apartment = typeof apartments.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
