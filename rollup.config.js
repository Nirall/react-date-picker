import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import image from '@rollup/plugin-image';

import dts from "rollup-plugin-dts";
import scss from "rollup-plugin-scss";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.cjs",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      scss({
        include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],
        output: "css/style.css",
        failOnError: true,
      }),
      image(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];