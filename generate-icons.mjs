import sharp from 'sharp';
import { readFileSync } from 'fs';

const svgContent = readFileSync('public/images/logo.svg', 'utf8');

async function generateIcon(size, outputPath) {
  const padding = Math.round(size * 0.15);
  const logoWidth = size - padding * 2;
  const logoHeight = Math.round(logoWidth * (194.2 / 656));
  const logoTop = Math.round((size - logoHeight) / 2);

  const resizedLogo = await sharp(Buffer.from(svgContent))
    .resize(logoWidth, logoHeight)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 207, g: 224, b: 237, alpha: 1 }
    }
  })
  .composite([{ input: resizedLogo, top: logoTop, left: padding }])
  .png()
  .toFile(outputPath);

  console.log('Generated:', outputPath);
}

await generateIcon(512, 'public/images/pwa-512x512.png');
await generateIcon(192, 'public/images/pwa-192x192.png');
await generateIcon(180, 'public/images/apple-touch-icon.png');
