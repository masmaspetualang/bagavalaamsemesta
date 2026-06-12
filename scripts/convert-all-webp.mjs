/**
 * convert-all-webp.mjs
 * Converts ALL images in src/assets/** to optimized WebP
 * Skips already-converted WebP files and the mesin/optimized folder (already done)
 *
 * Run: node scripts/convert-all-webp.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ASSETS_ROOT = join(__dirname, '../src/assets');

// Per-folder settings: [maxWidth, quality]
const FOLDER_SETTINGS = {
  'Foto':              [1200, 80],
  'konten':            [1200, 80],
  'NEWWIDYATEMULAWAK': [900,  82],
  'produk':            [700,  83],
  'mesin':             [1280, 82],  // skip /optimized sub-folder
};

const DEFAULT_SETTINGS = [1000, 80];

async function getFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip already-done optimized folders
      if (entry.name === 'optimized') continue;
      const sub = await getFilesRecursive(fullPath);
      files.push(...sub);
    } else if (/\.(jpe?g|png|JPE?G|PNG)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function getSettings(filePath) {
  const rel = relative(ASSETS_ROOT, filePath);
  const folder = rel.split(/[\\/]/)[0];
  return FOLDER_SETTINGS[folder] || DEFAULT_SETTINGS;
}

async function main() {
  const images = await getFilesRecursive(ASSETS_ROOT);
  console.log(`\n📦 Found ${images.length} images to optimize\n`);

  let totalIn = 0, totalOut = 0;

  for (const imgPath of images) {
    const dir    = dirname(imgPath);
    const name   = basename(imgPath, extname(imgPath)).toLowerCase()
      .replace(/\s+/g, '_');           // spaces → underscores
    const outDir = join(dir, 'optimized');
    const outPath = join(outDir, `${name}.webp`);

    await mkdir(outDir, { recursive: true });

    const [maxWidth, quality] = getSettings(imgPath);
    const inputStat = await stat(imgPath);
    const inputSize = inputStat.size;

    try {
      const info = await sharp(imgPath)
        .rotate()                                  // auto-rotate EXIF
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toFile(outPath);

      const savings = (((inputSize - info.size) / inputSize) * 100).toFixed(0);
      totalIn  += inputSize;
      totalOut += info.size;

      const relPath = relative(ASSETS_ROOT, imgPath).padEnd(65);
      console.log(
        `✓ ${relPath}  ${(inputSize/1024).toFixed(0).padStart(6)} KB → ${(info.size/1024).toFixed(0).padStart(5)} KB  (−${savings}%)`
      );
    } catch (err) {
      console.error(`✗ Failed: ${imgPath}\n  ${err.message}`);
    }
  }

  console.log('\n─────────────────────────────────────────────────────');
  console.log(`✅ Done!  Total: ${(totalIn/1024/1024).toFixed(1)} MB → ${(totalOut/1024).toFixed(0)} KB`);
  console.log(`   Savings: ${(((totalIn-totalOut)/totalIn)*100).toFixed(1)}%`);
}

main().catch(console.error);
