const resolve = require("@rollup/plugin-node-resolve").default

const { babel } = require("@rollup/plugin-babel")
const { terser } = require("rollup-plugin-terser")

const commonjs = require("@rollup/plugin-commonjs")
const pkg = require("./package.json")

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: ["index.tsx"],
  output: [
    {
      format: "esm",
      file: pkg.main,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    resolve({ extensions: [".mjs", ".js", ".jsx", ".json", ".node", ".ts", ".tsx"], preferBuiltins: true }),
    commonjs(),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
    }),
    process.env.NODE_ENV === "production" ? terser() : undefined,
  ],
  external: getExternalDependencies(),
}

function getExternalDependencies() {
  if (!pkg.dependencies) {
    throw new Error("Cannot find module dependencies")
  }

  return Object.keys(pkg.dependencies).filter((dependency) => dependency !== "@enterprise-commerce/tui")
}
