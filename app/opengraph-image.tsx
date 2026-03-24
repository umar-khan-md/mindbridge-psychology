import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "MindBridge Psychology - Expert Telehealth Psychology Australia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0D7377 0%, #0b6265 50%, #0f5255 100%)",
          padding: "60px",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(212, 168, 83, 0.1)",
          }}
        />

        {/* Logo / Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "#ffffff",
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            MindBridge Psychology
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "20px",
          }}
        >
          Expert Telehealth Psychology Across Australia
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255, 255, 255, 0.85)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "32px",
          }}
        >
          AHPRA Registered Psychologists | Medicare, NDIS, WorkCover & DVA Accepted
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#D4A853",
            borderRadius: "2px",
            marginBottom: "24px",
          }}
        />

        {/* URL */}
        <div
          style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.6)",
            letterSpacing: "0.08em",
          }}
        >
          mindbridgepsychology.com.au
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
