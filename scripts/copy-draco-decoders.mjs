import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const decoderSource = path.resolve(
  "node_modules",
  "three",
  "examples",
  "jsm",
  "libs",
  "draco",
  "gltf"
);
const decoderDestination = path.resolve("public", "draco");
const decoderFiles = [
  "draco_decoder.js",
  "draco_decoder.wasm",
  "draco_wasm_wrapper.js",
];

await mkdir(decoderDestination, { recursive: true });
await Promise.all(
  decoderFiles.map((file) =>
    copyFile(path.join(decoderSource, file), path.join(decoderDestination, file))
  )
);

console.log(`Copied ${decoderFiles.length} Draco decoder files.`);
