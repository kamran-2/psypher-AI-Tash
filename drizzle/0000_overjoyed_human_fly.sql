CREATE TYPE "public"."tier" AS ENUM('free', 'silver', 'gold', 'platinum');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"event_date" timestamp with time zone NOT NULL,
	"image_url" text,
	"tier" "tier" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
