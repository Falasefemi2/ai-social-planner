/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { AIOutput } from "./db/schema";

interface CreateDocInput {
  title: string;
  templateUsed: string;
}

export async function createDocument({ title, templateUsed }: CreateDocInput) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User Not Authenticated");
    }

    console.log("Creating document with:", { title, templateUsed, userId }); // Log input values

    const createNewDoc = await db
      .insert(AIOutput)
      .values({
        userId: userId,
        title: title,
        templateUsed: templateUsed,
        createdAt: new Date(),
      })
      .returning();

    console.log("Document created:", createNewDoc); // Log the result

    revalidatePath("/");

    return { success: true, data: createNewDoc[0] };
  } catch (error) {
    console.error("Error creating document:", error);
    return { success: false, error: "Failed to create document" };
  }
}
