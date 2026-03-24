import { NextRequest, NextResponse } from "next/server";
import { consentSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = consentSchema.safeParse(body);

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
    console.log("[Consent Submission]", {
      timestamp: new Date().toISOString(),
      signatureName: result.data.signatureName,
      signatureDate: result.data.signatureDate,
      allSectionsAcknowledged: true,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your telehealth consent has been recorded securely. A confirmation email will be sent to you.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Consent API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
