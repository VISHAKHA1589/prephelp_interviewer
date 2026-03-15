"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const completeOnboarding = async (data) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { role, title, company, yearsExp, bio, categories } = data;

  if (!role || !["INTERVIEWEE", "INTERVIEWER"].includes(role)) {
    return { error: "Invalid role" };
  }

  if (role === "INTERVIEWER") {
    if (!title || !company || !yearsExp || !bio || !categories?.length) {
      return { error: "Please fill in all required fields" };
    }
  }

  try {
    await db.user.update({
      where: { clerkUserId: user.id },
      data: {
        role,
        ...(role === "INTERVIEWER" && {
          title,
          company,
          yearsExp,
          bio,
          categories,
        }),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
