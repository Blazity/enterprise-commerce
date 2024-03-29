/* eslint-env es6 */
/* eslint-disable no-console */

const fs = require("fs")

module.exports = {
  globals: {
    React: true,
    JSX: true,
  },
  extends: ["next", "prettier", "react-app", "react-app/jest", "plugin:storybook/recommended", "plugin:tailwindcss/recommended"],
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
