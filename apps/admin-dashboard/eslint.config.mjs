import path from "node:path";
import { fileURLToPath } from "node:url";
import { createNextEslintConfig } from "@v8n/config/eslint/next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default createNextEslintConfig(__dirname);
