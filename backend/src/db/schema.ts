import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),

  sku: varchar("sku", {
    length: 100,
  })
    .notNull()
    .unique(),

  productName: varchar("product_name", {
    length: 255,
  }).notNull(),

  quantity: integer("quantity")
    .notNull()
    .default(0),

  warehouse: varchar("warehouse", {
    length: 255,
  }).notNull(),

  lastSyncedAt: timestamp("last_synced_at")
    .defaultNow()
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const webhookEvents = pgTable("webhook_events", {
  id: serial("id").primaryKey(),

  eventId: varchar("event_id", {
    length: 255,
  })
    .notNull()
    .unique(),

  eventType: varchar("event_type", {
    length: 100,
  }).notNull(),

  payload: text("payload").notNull(),

  processed: boolean("processed")
    .notNull()
    .default(false),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const syncHistory = pgTable("sync_history", {
  id: serial("id").primaryKey(),

  status: varchar("status", {
    length: 50,
  }).notNull(),

  recordsProcessed: integer("records_processed")
    .notNull()
    .default(0),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const attendees = pgTable("attendees", {
  id: serial("id").primaryKey(),

  qrCode: varchar("qr_code", { length: 255 })
    .notNull()
    .unique(),

  fullName: varchar("full_name", { length: 255 })
    .notNull(),

  status: varchar("status", {
    length: 50,
  })
    .notNull()
    .default("NOT_CHECKED_IN"),

  checkedInAt: timestamp("checked_in_at"),
});

//print jobs table to track print jobs for attendees
export const printJobs = pgTable("print_jobs", {
  id: serial("id").primaryKey(),

  attendeeId: integer("attendee_id").notNull(),

  jobId: varchar("job_id", {
    length: 255,
  }).notNull(),

  status: varchar("status", {
    length: 50,
  })
    .notNull()
    .default("PENDING"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});