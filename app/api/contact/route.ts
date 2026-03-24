import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      return NextResponse.json(
        { error: "Validation failed", fieldErrors },
        { status: 400 }
      );
    }

    // --- Placeholder for Supabase / Resend integration ---
    console.log("[Contact Form Submission]", {
      timestamp: new Date().toISOString(),
      data: result.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We will respond within 1 business day.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
