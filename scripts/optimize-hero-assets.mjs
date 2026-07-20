import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const framesDirectory = path.resolve("public", "runframes");
const sourceFiles = (await readdir(framesDirectory))
  .filter((file) => file.toLowerCase().endsWith(".png"))
  .sort();

let sourceBytes = 0;
let outputBytes = 0;

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(framesDirectory, sourceFile);
  const outputPath = path.join(
    framesDirectory,
    sourceFile.replace(/\.png$/i, ".webp")
  );

  sourceBytes += (await stat(sourcePath)).size;

  await sharp(sourcePath)
    .webp({
      quality: 88,
      alphaQuality: 100,
      smartSubsample: true,
      effort: 3,
    })
    .toFile(outputPath);

  outputBytes += (await stat(outputPath)).size;
}

const toMegabytes = (bytes) => (bytes / 1024 / 1024).toFixed(2);

console.log(
  `Optimized ${sourceFiles.length} hero assets: ${toMegabytes(sourceBytes)} MB -> ${toMegabytes(outputBytes)} MB`
);
