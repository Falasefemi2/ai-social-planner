CREATE TABLE IF NOT EXISTS "ai_purchase" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"credit" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_stripe_customer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"stripe_customer_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ai_stripe_customer_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "ai_stripe_customer_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
