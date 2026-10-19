// Rasterizes public/brand/taskora-mark.svg into the PNG sizes Taskora needs.
// Uses the sharp package that Next already installs.
//
// Run with: npm run brand:icons

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "public", "brand", "taskora-mark.svg");
const FAVICON = join(ROOT, "src", "app", "icon.svg");
const MARK_BACKGROUND = { r: 0x18, g: 0x18, b: 0x1b, alpha: 1 };

function relative(path) {
  return path.slice(ROOT.length + 1).replaceAll("\\", "/");
}

async function writeExact(size, destination) {
  mkdirSync(dirname(destination), { recursive: true });
  await sharp(SOURCE).resize(size, size).png().toFile(destination);
  console.log(`wrote ${relative(destination)} (${size}x${size})`);
}

// Apple applies its own mask, so pad the mark on the brand background color.
async function writeApple(size, destination, paddingRatio = 0.12) {
  mkdirSync(dirname(destination), { recursive: true });
  const inner = Math.round(size * (1 - 2 * paddingRatio));
  const mark = await sharp(SOURCE).resize(inner, inner).png().toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: MARK_BACKGROUND,
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(destination);

  console.log(`wrote ${relative(destination)} (${size}x${size}, padded)`);
}

async function main() {
  // Keep the App Router favicon identical to the shared public mark.
  copyFileSync(SOURCE, FAVICON);
  console.log("synced src/app/icon.svg from public/brand/taskora-mark.svg");

  await writeApple(180, join(ROOT, "src", "app", "apple-icon.png"));
  await writeExact(192, join(ROOT, "public", "icons", "icon-192.png"));
  await writeExact(512, join(ROOT, "public", "icons", "icon-512.png"));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
