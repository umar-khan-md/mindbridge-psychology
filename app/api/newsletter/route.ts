import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: { email: result.error.issues[0]?.message || "Invalid email" },
        },
        { status: 400 }
      );
    }

    // --- Placeholder for mailing list integration (Resend, Mailchimp, etc.) ---
    console.log("[Newsletter Signup]", {
      timestamp: new Date().toISOString(),
      email: result.data.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "You have been subscribed to our newsletter. Welcome!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
