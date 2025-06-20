import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "app/generated/**", // prisma generated files, no ts
      "node_modules/**", // third party dependencies
      ".next/**", // next's build output object
      "out/**" // static export output (not using, but just in case)
    ]
  }
];

export default eslintConfig;
