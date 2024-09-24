/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { purchase, stripeCustomer } from "@/app/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    console.log(req); // Added usage of req
    const { userId } = auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "10,000 AI Credit",
            description: "all $10 worth of credit",
          },
          unit_amount: 1000,
        },
      },
    ];

    // Create purchase
    const [newPurchase] = await db
      .insert(purchase)
      .values({
        userId: userId, // Ensure userId is a string
        credit: String(10000), // Convert credit to string
      })
      .returning();

    // Use newPurchase for further processing
    console.log(newPurchase); // Example usage

    // Find existing stripe customer
    const [existingStripeCustomer] = await db
      .select({
        stripeCustomerId: stripeCustomer.stripeCustomerId,
      })
      .from(stripeCustomer)
      .where(eq(stripeCustomer.userId, userId))
      .limit(1);

    let customerStripeId: string;

    if (!existingStripeCustomer) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0].emailAddress,
      });

      // Create new stripe customer record in database
      const [newStripeCustomer] = await db
        .insert(stripeCustomer)
        .values({
          userId: userId,
          stripeCustomerId: customer.id,
        })
        .returning();

      customerStripeId = newStripeCustomer.stripeCustomerId;
    } else {
      customerStripeId = existingStripeCustomer.stripeCustomerId;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerStripeId,
      line_items,
      mode: "payment",
      success_url: `https://ai-social-planner-9wbo.vercel.app//dashboard/`,
      cancel_url: `https://ai-social-planner-9wbo.vercel.app/`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error in POST /api/create-checkout-session:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
