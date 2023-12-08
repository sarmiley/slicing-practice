module.exports = {
  env: { browser: true, es2020: true },
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
      ],

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  plugins: ["react", "@typescript-eslint", "react-refresh", "prettier"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { 'allowConstantExport': true },
    // ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        "name": "react-redux",
        "importNames": ["useSelector", "useDispatch"],
        "message":
          "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
