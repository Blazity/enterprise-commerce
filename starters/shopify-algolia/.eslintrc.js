/* eslint-env es6 */
/* eslint-disable no-console */

module.exports = {
  globals: {
    React: true,
    JSX: true,
  },
  extends: ["next", "next/typescript", "prettier", "plugin:tailwindcss/recommended"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
    ecmaVersion: "latest",
  },
  env: {
    es6: true,
  },
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "testing-library/prefer-screen-queries": "off",
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "eslint-comments/disable-enable-pair": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "tailwindcss/classnames-order": "off",
  },
}
