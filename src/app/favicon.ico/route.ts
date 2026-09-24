const favicon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="32" fill="#3b302b"/>
  <circle cx="32" cy="32" r="25" fill="none" stroke="#b8744f" stroke-width="2"/>
  <text x="32" y="39" fill="#f8f5ef" font-family="Georgia, serif" font-size="20" font-style="italic" text-anchor="middle">MK</text>
</svg>
`.trim();

export const dynamic = "force-static";

export function GET() {
  return new Response(favicon, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "image/svg+xml",
    },
  });
}
