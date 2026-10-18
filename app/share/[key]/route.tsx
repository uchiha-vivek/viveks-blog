import { ImageResponse } from "next/og";
import { shareCards } from "@/lib/share-cards";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return shareCards.map(({ key }) => ({ key }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const card = shareCards.find((item) => item.key === key);
  if (!card) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#1b1712", color: "#f4eee0", padding: "54px 64px", borderTop: "10px solid #cf9a52", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 25, borderBottom: "1px solid #51432f" }}>
        <span style={{ fontSize: 26, color: "#cf9a52" }}>{site.masthead}</span>
        <span style={{ fontSize: 22, color: "#b6aa94" }}>{site.domain}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        <div style={{ fontSize: 18, color: "#cf9a52", letterSpacing: 3, marginBottom: 22 }}>{card.label}</div>
        <div style={{ fontSize: card.title.length > 65 ? 53 : card.title.length > 40 ? 62 : 76, fontWeight: 700, lineHeight: 1.12, letterSpacing: -2 }}>{card.title}</div>
        <div style={{ fontSize: 25, lineHeight: 1.45, color: "#c5baa6", marginTop: 24 }}>{card.description.length > 155 ? `${card.description.slice(0, 152).trimEnd()}…` : card.description}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #51432f", paddingTop: 22, color: "#b6aa94", fontSize: 21 }}>
        <span>By {site.author}</span>
        <span style={{ display: "flex", alignItems: "center", background: "#cf9a52", color: "#1b1712", padding: "12px 22px", borderRadius: 6, fontWeight: 700 }}>{card.callToAction}</span>
      </div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" } },
  );
}
