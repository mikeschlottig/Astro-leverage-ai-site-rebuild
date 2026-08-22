import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const ogDir = path.join(publicDir, "images", "og");
const markPath = path.join(publicDir, "images", "leverage-ai-mark.svg");
const founderPath = path.join(root, "src", "assets", "founder", "mike-schlottig.webp");

await mkdir(ogDir, { recursive: true });

const mark = await readFile(markPath);
await writeFile(path.join(publicDir, "favicon.svg"), mark);

const faviconPng = await sharp(mark).resize(32, 32).png().toBuffer();
await writeFile(path.join(publicDir, "favicon-32x32.png"), faviconPng);
await sharp(mark).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));

const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader.writeUInt8(32, 6);
icoHeader.writeUInt8(32, 7);
icoHeader.writeUInt8(0, 8);
icoHeader.writeUInt8(0, 9);
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(faviconPng.length, 14);
icoHeader.writeUInt32LE(22, 18);
await writeFile(path.join(publicDir, "favicon.ico"), Buffer.concat([icoHeader, faviconPng]));

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const socialSvg = ({ eyebrow, heading, body, withPortrait = false }) => Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#111214"/>
        <stop offset="1" stop-color="#1d1b18"/>
      </linearGradient>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0.54" stop-color="#111214"/>
        <stop offset="0.82" stop-color="#111214" stop-opacity="0.78"/>
        <stop offset="1" stop-color="#111214" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="${withPortrait ? "url(#fade)" : "url(#bg)"}"/>
    <circle cx="1080" cy="-20" r="300" fill="#e6a84a" opacity="0.08"/>
    <rect x="58" y="58" width="82" height="82" rx="10" fill="#111214" stroke="#e6a84a" stroke-width="2"/>
    <path d="M76 74h12v45h40v12H76z" fill="#f9efe2"/>
    <path d="M108 74h12l14 37h-13l-7-20-7 20H94z" fill="#e6a84a"/>
    <text x="162" y="95" fill="#f9efe2" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="2">LEVERAGE AI</text>
    <text x="162" y="127" fill="#b8b0a4" font-family="Arial, Helvetica, sans-serif" font-size="18" letter-spacing="1.5">OREGON DIGITAL INFRASTRUCTURE</text>
    <rect x="58" y="182" width="72" height="5" rx="2.5" fill="#e6a84a"/>
    <text x="58" y="236" fill="#e6a84a" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="2">${escapeXml(eyebrow.toUpperCase())}</text>
    <text x="58" y="310" fill="#f9efe2" font-family="Arial, Helvetica, sans-serif" font-size="${withPortrait ? 53 : 60}" font-weight="700">
      ${heading.map((line, index) => `<tspan x="58" dy="${index === 0 ? 0 : withPortrait ? 62 : 70}">${escapeXml(line)}</tspan>`).join("")}
    </text>
    <text x="58" y="${withPortrait ? 470 : 487}" fill="#c9c0b5" font-family="Arial, Helvetica, sans-serif" font-size="25">
      ${body.map((line, index) => `<tspan x="58" dy="${index === 0 ? 0 : 34}">${escapeXml(line)}</tspan>`).join("")}
    </text>
    <text x="58" y="580" fill="#f9efe2" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700">leverageai.network</text>
  </svg>
`);

await sharp(socialSvg({
  eyebrow: "Built for Oregon service businesses",
  heading: ["Turn visibility", "into revenue."],
  body: ["Outcome-led websites, local search,", "and lead-response infrastructure."],
}))
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(path.join(ogDir, "leverage-ai-default.jpg"));

const founder = await sharp(founderPath)
  .resize(520, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88 })
  .toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#111214" },
})
  .composite([
    { input: founder, left: 680, top: 0 },
    {
      input: socialSvg({
        eyebrow: "OregonVoyager founder interview",
        heading: ["Meet Jon “Mike”", "Schlottig."],
        body: ["The story and operating ideas", "behind Leverage AI LLC."],
        withPortrait: true,
      }),
      left: 0,
      top: 0,
    },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(path.join(ogDir, "oregon-voyager-interview.jpg"));

await writeFile(
  path.join(publicDir, "site.webmanifest"),
  `${JSON.stringify({
    name: "Leverage AI",
    short_name: "Leverage AI",
    icons: [
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    theme_color: "#111214",
    background_color: "#111214",
    display: "standalone",
  }, null, 2)}\n`,
);

console.log("Generated favicon and Open Graph assets.");
