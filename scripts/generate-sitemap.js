import { writeFileSync } from "fs";

const domain = "https://creatoxd.co.in";
const routes = [
  "/", "/about", "/partners", "/contact",
  "/portfolio",
  "/portfolio/branding",
  "/portfolio/graphic-design",
  "/portfolio/photo-editing",
  "/portfolio/ui-ux-design",
  "/portfolio/video-editing",
  "/portfolio/web-development"
];
const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${domain}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r === "/" || r.startsWith("/portfolio") ? "weekly" : "monthly"}</changefreq>
    <priority>${r === "/" ? "1.00" : r === "/portfolio" ? "0.85" : "0.60"}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log("sitemap.xml generated");