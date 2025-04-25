import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Detection record model
export const detections = pgTable("detections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  mediaType: text("media_type").notNull(), // "image", "video", "camera"
  mediaUrl: text("media_url").notNull(),
  results: jsonb("results").notNull(), // JSON containing detection results
  createdAt: timestamp("created_at").defaultNow().notNull(),
  location: text("location"), // Optional location data
  deviceInfo: text("device_info"), // Optional device information
});

// Schemas for creating new records
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDetectionSchema = createInsertSchema(detections).omit({
  id: true,
  createdAt: true,
});

// Types for TypeScript usage
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDetection = z.infer<typeof insertDetectionSchema>;
export type Detection = typeof detections.$inferSelect;

// Detection result types
export interface DetectionResult {
  id: number;
  type: string;
  confidence: number;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  severity: "Low" | "Medium" | "High";
}

export interface DetectionSummary {
  totalIssues: number;
  recommendedAction: string;
}

export interface DetectionData {
  detections: DetectionResult[];
  summary: DetectionSummary;
}
