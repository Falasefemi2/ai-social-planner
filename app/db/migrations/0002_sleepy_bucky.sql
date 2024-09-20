ALTER TABLE "ai_aioutput" ALTER COLUMN "user_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "ai_users" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "ai_users" ALTER COLUMN "id" DROP DEFAULT;