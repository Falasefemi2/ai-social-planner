/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { AIOutput } from "./db/schema";

interface CreateDocInput {
  title: string;
  templateUsed: string;
  description: string;
  airesponse: string;
}

export async function createDocument({
  title,
  templateUsed,
  description,
  airesponse,
}: CreateDocInput) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("User Not Authenticated");
    }

    console.log("Creating document with:", {
      title,
      templateUsed,
      userId,
      airesponse,
    }); // Log input values

    const createNewDoc = await db
      .insert(AIOutput)
      .values({
        userId: userId,
        title: title,
        templateUsed: templateUsed,
        description: description,
        aiResponse: airesponse,
        createdAt: new Date(),
      })
      .returning();

    console.log("Document created:", createNewDoc); // Log the result

    revalidatePath("/dashboard");

    return { success: true, data: createNewDoc[0] };
  } catch (error) {
    console.error("Error creating document:", error);
    return { success: false, error: "Failed to create document" };
  }
}
