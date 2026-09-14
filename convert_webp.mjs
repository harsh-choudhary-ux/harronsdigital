import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

const convertList = [
  { name: 'founder.jpg', upscale: 2 },
  { name: 'hero-showcase.png', upscale: 2 },
  { name: 'corkboard.png', upscale: 1 },
  { name: 'showcase-1.jpg', upscale: 1.5 },
  { name: 'showcase-2.jpg', upscale: 1.5 },
  { name: 'showcase-3.jpg', upscale: 1.5 },
  { name: 'recent-work-wide.png', upscale: 2 },
  { name: 'testimonials-laptop-bg.jpg', upscale: 2 },
  { name: 'testimonials-stats-bg.jpg', upscale: 2 },
  { name: 'recent-work-bg.jpg', upscale: 1 },
  { name: 'recent-work-poster.png', upscale: 1.5 },
  { name: 'hero-pill-1.png', upscale: 2 },
  { name: 'hero-pill-2.png', upscale: 2 },
  { name: 'hero-pill-3.png', upscale: 2 },
];

async function run() {
  for (const item of convertList) {
    const inputPath = path.join(imagesDir, item.name);
    if (!fs.existsSync(inputPath)) continue;

    const parsed = path.parse(item.name);
    const outputPath = path.join(imagesDir, `${parsed.name}.webp`);

    const image = sharp(inputPath);
    const meta = await image.metadata();

    let pipeline = sharp(inputPath);
    if (item.upscale > 1 && meta.width) {
      const targetWidth = Math.round(meta.width * item.upscale);
      pipeline = pipeline.resize({
        width: targetWidth,
        kernel: sharp.kernel.lanczos3,
      });
    }

    await pipeline
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(outputPath);

    const outMeta = await sharp(outputPath).metadata();
    const outStat = fs.statSync(outputPath);
    console.log(`Converted ${item.name} -> ${parsed.name}.webp: ${outMeta.width}x${outMeta.height}, ${(outStat.size / 1024).toFixed(1)} KB`);
  }
}

run().catch(console.error);
