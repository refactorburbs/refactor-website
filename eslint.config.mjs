import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    // "Never lint anything from these paths, replacing the traditional .eslintignore file"
    ignores: [
      "node_modules/**", // third party dependencies we didn't write/don't control
      ".next/**", // next's build output folder; generated code, regenerated on every build
      "out/**", // output directory from next export (static site export) - not using this though, but just in case
      "build/**", // generic build output file; harmless to include
      "next-env.d.ts", // TS declaration file Next.js auto-generates and manages
      "app/generated/**", // prisma generated files, no ts there to lint
    ]
  },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;