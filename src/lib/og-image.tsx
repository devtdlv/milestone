import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { BRAND } from "@/lib/brand";

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageContentType = "image/png";

export const ogImageAlt = `${BRAND.name} - ${BRAND.tagline}`;

export async function createOgImage() {
  const mark = await readFile(
    join(process.cwd(), "public", "icons", "icon-512.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BRAND.colors.app,
          backgroundImage:
            "radial-gradient(circle at top right, rgba(99, 102, 241, 0.16), transparent 42%), linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
          padding: "72px 80px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* next/image is not available inside ImageResponse. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={88} height={88} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: BRAND.colors.ink,
            }}
          >
            {BRAND.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: BRAND.colors.ink,
            }}
          >
            {BRAND.tagline}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 820,
              fontSize: 28,
              lineHeight: 1.45,
              color: BRAND.colors.muted,
            }}
          >
            Workspaces, projects, Kanban boards, and task comments in one place.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 22,
            color: BRAND.colors.muted,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: BRAND.colors.accent,
            }}
          />
          Multi-tenant project management
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}
