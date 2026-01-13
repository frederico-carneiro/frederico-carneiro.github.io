import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, '..', 'public', 'images');
const BACKUP_DIR = join(__dirname, '..', 'public', 'images-backup');
const QUALITY = 90; // High quality WebP

async function getAllImages(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else {
      const ext = extname(item.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function convertImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  try {
    const inputStats = await stat(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(1);

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStats = await stat(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(1);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`✓ ${basename(inputPath)}`);
    console.log(`  ${inputSizeKB} KB → ${outputSizeKB} KB (${savings}% smaller)\n`);

    return {
      input: inputPath,
      output: outputPath,
      inputSize: inputStats.size,
      outputSize: outputStats.size
    };
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🖼️  WebP Image Converter\n');
  console.log(`Quality: ${QUALITY}%\n`);
  console.log('Finding images...\n');

  const images = await getAllImages(IMAGES_DIR);
  console.log(`Found ${images.length} images to convert\n`);
  console.log('─'.repeat(50) + '\n');

  let totalInputSize = 0;
  let totalOutputSize = 0;
  let converted = 0;

  for (const imagePath of images) {
    const result = await convertImage(imagePath);
    if (result) {
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
      converted++;
    }
  }

  console.log('─'.repeat(50));
  console.log('\n📊 Summary:\n');
  console.log(`  Images converted: ${converted}/${images.length}`);
  console.log(`  Original size: ${(totalInputSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  New size: ${(totalOutputSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Total saved: ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(1)} MB (${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%)`);
  console.log('\n✅ Done! Now update your code to use .webp extensions.\n');
}

main().catch(console.error);
