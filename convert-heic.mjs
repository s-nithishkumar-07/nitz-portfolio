import { promises as fs } from 'fs';
import heicConvert from 'heic-convert';
import path from 'path';

const galleryDir = 'e:/NitzFinalPortfolio/portfolio/public/gallery';

async function convertHeicToJpg() {
  const files = await fs.readdir(galleryDir);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic')) {
      const filePath = path.join(galleryDir, file);
      console.log(`Converting ${file}...`);
      const inputBuffer = await fs.readFile(filePath);
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.8
      });
      const newFile = file.replace(/\.HEIC$/i, '.jpg');
      const newFilePath = path.join(galleryDir, newFile);
      await fs.writeFile(newFilePath, Buffer.from(outputBuffer));
      console.log(`Converted to ${newFile}`);
      await fs.unlink(filePath); // delete original HEIC
    }
  }
}

convertHeicToJpg().catch(console.error);
