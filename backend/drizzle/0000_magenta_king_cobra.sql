CREATE TABLE "attendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"qr_code" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'NOT_CHECKED_IN' NOT NULL,
	"checked_in_at" timestamp,
	CONSTRAINT "attendees_qr_code_unique" UNIQUE("qr_code")
);
--> statement-breakpoint
CREATE TABLE "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" varchar(100) NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"warehouse" varchar(255) NOT NULL,
	"last_synced_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inventory_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "print_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"attendee_id" integer NOT NULL,
	"job_id" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sync_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(50) NOT NULL,
	"records_processed" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" varchar(255) NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"payload" text NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "webhook_events_event_id_unique" UNIQUE("event_id")
);
