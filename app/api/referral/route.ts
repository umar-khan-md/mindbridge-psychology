import { NextRequest, NextResponse } from "next/server";
import { referralSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = referralSchema.safeParse(body);

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

    // --- Placeholder for Supabase / email notification integration ---
    console.log("[Referral Submission]", {
      timestamp: new Date().toISOString(),
      referrer: result.data.referrerName,
      practice: result.data.referrerPractice,
      patient: result.data.patientName,
      hasMHTP: result.data.mentalHealthPlan,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Referral received. We will contact the patient within 1–2 business days.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Referral API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
