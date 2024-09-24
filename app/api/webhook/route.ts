/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import { db } from "@/app/db";
import { User } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const customerEmail = session?.customer_email;
  const customerName = session?.customer_details?.name;

  if (event.type === "checkout.session.completed") {
    if (!userId) {
      return new NextResponse("Invalid session", { status: 400 });
    }

    try {
      // Find user by userId
      const [existingUser] = await db
        .select()
        .from(User)
        .where(eq(User.id, userId))
        .limit(1);

      if (!existingUser) {
        // Create new user
        await db.insert(User).values({
          id: userId,
          email: customerEmail || "",
          firstName: customerName?.split(" ")[0] || "",
          lastName: customerName?.split(" ")[1] || "",
          totalCredit: "20000", // Convert the number to a string to match the decimal column type
        });
      } else {
        // Update existing user
        await db
          .update(User)
          .set({
            totalCredit: String(
              (Number(existingUser.totalCredit) || 10000) + 10000
            ), // Convert to string
          })
          .where(eq(User.id, userId));
      }

      return new NextResponse("Success", { status: 200 });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new NextResponse("Invalid User not authorized", { status: 500 });
    }
  } else {
    return new NextResponse("Invalid event", { status: 200 });
  }
}
