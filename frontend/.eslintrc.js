module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "eslint:recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        tsconfigRootDir: __dirname,
        "project": ["./tsconfig.json"]
    },
    "plugins": [
        "prettier",
        "import",
        "@typescript-eslint"
    ],
    "rules": {
        "no-console": 0,
        "no-alert": 0,
        "class-methods-use-this": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-floating-promises": "off",
        "no-param-reassign": "off",
        "no-restricted-syntax": "off"
    }
}
