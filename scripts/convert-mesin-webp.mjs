/**
 * convert-mesin-webp.mjs
 * Converts all images in src/assets/mesin/ to optimized WebP format.
 * Output goes to src/assets/mesin/optimized/
 *
 * Run: node scripts/convert-mesin-webp.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const INPUT_DIR  = join(__dirname, '../src/assets/mesin');
const OUTPUT_DIR = join(__dirname, '../src/assets/mesin/optimized');

// Quality/resize settings
const WEBP_QUALITY = 82;   // 80-85 sweet spot: quality vs size
const MAX_WIDTH    = 1280; // More than enough for gallery display

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const images = files.filter(f =>
    /\.(jpe?g|png|JPE?G|PNG)$/i.test(extname(f))
  );

  console.log(`Found ${images.length} images to convert...\n`);

  for (const file of images) {
    const inputPath  = join(INPUT_DIR, file);
    const name       = basename(file, extname(file)).toLowerCase();
    const outputPath = join(OUTPUT_DIR, `${name}.webp`);

    const info = await sharp(inputPath)
      .rotate()                // auto-rotate based on EXIF
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const inputSize  = (await import('fs')).statSync(inputPath).size;
    const savings    = (((inputSize - info.size) / inputSize) * 100).toFixed(1);

    console.log(
      `✓ ${file.padEnd(20)} → ${name}.webp`,
      `  ${(inputSize / 1024 / 1024).toFixed(2)} MB → ${(info.size / 1024).toFixed(0)} KB`,
      `  (saved ${savings}%)`
    );
  }

  console.log('\n✅ All images converted to WebP successfully!');
  console.log(`📁 Output: src/assets/mesin/optimized/`);
}

main().catch(console.error);
