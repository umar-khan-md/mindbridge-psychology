import { NextRequest, NextResponse } from "next/server";
import { intakeSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = intakeSchema.safeParse(body);

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

    // --- Placeholder for Supabase integration ---
    console.log("[Intake Form Submission]", {
      timestamp: new Date().toISOString(),
      patient: `${result.data.firstName} ${result.data.lastName}`,
      email: result.data.email,
      concerns: result.data.presentingConcerns,
      funding: result.data.fundingMethod,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your intake form has been received. We will contact you within 1–2 business days to schedule your first session.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Intake API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
