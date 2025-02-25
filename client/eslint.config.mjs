import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsparser from '@typescript-eslint/parser';
import tsstylistic from '@stylistic/eslint-plugin-ts';
import angular from "angular-eslint";
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/"
    ]
  },
    {
      files: ["**/*.ts"],
      plugins: {
        '@stylistic/ts': tsstylistic,
        "unused-imports": eslintPluginUnusedImports
      },
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsAll,
        // ...tseslint.configs.strictTypeChecked,
        // ...tseslint.configs.stylisticTypeChecked,
        eslintPluginImport.flatConfigs.recommended,
        eslintPluginImport.flatConfigs.typescript,
      ],
      languageOptions : {
        parser: tsparser,
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname,
        },
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: "./tsconfig.json"
          }
        }
      },
      rules: {
        "@angular-eslint/directive-selector": ["error", {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }],
        "@angular-eslint/component-selector": ["error", {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }],
        "@angular-eslint/prefer-on-push-component-change-detection": "off",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "brace-style": "off",
        "@stylistic/ts/brace-style": ["error", "1tbs", { allowSingleLine: true}],
        "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
        "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
        "@stylistic/ts/member-delimiter-style": ["error", {
          multiline: {
            delimiter: "semi",
            requireLast: true
          },
          singleline: {
            delimiter: "semi",
            requireLast: true
          }
        }],
        "@typescript-eslint/member-ordering": [
          "error",
          {
            default: [
              "private-static-field",
              "private-instance-field",
              "protected-static-field",
              "protected-instance-field",
              "public-static-field",
              "public-instance-field",
              "public-constructor",
              "protected-constructor",
              "private-constructor",
              "public-instance-method",
              "public-static-method",
              "protected-instance-method",
              "protected-static-method",
              "private-instance-method",
              "private-static-method"
            ]
          }
        ],
        "@typescript-eslint/naming-convention": ["error", {
            selector: ["enumMember"],
            format: ["PascalCase"]
          },
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: {
              regex: "^I[A-Z]",
              match: false
            }
          },
          {
            selector: "typeLike",
            format: ["PascalCase"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid"
          },
          {
            selector: ["variableLike", "property"],
            format: ["strictCamelCase"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid"
          },
          {
            selector: "parameter",
            format: ["strictCamelCase", "camelCase"],
            leadingUnderscore: "allow"
          },
          {
            selector: "variable",
            modifiers: ["const", "global"],
            format: ["UPPER_CASE"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid"
          }
        ],
        "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
        "no-extra-parens": "off",
        "@stylistic/ts/no-extra-parens": ["error"],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["error"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "_" }],
        "@typescript-eslint/no-var-requires": ["error"],
        "@stylistic/ts/semi": ["error"],
        "arrow-body-style": [
          "error",
          "as-needed",
          {
            "requireReturnForObjectLiteral": true
          }
        ],
        "arrow-parens": ["error", "as-needed"],
        "comma-dangle": ["error", "never"],
        "curly": [
          "error",
          "all"
        ],
        "eqeqeq": ["error", "always", { "null": "ignore" }],
        "import/order": ["error", { alphabetize: { "order": "asc" } }],
        "max-len": ["error", {
          code: 300,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true
          }
        ],
        "no-console": ["error"],
        "no-empty": ["error", { allowEmptyCatch: false }],
        "no-else-return": ["error"],
        "no-fallthrough": ["error"],
        "no-trailing-spaces": ["error"],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-var": ["error"],
        "object-curly-newline": ["error", {
          "ObjectExpression": { "consistent": true, "multiline": true },
          "ObjectPattern": { "consistent": true, "multiline": true },
          "ImportDeclaration": { "consistent": true, "multiline": true },
          "ExportDeclaration": "never"
        }],
        "object-curly-spacing": ["error", "always"],
        "prefer-const": [ "error", {
          destructuring: "any",
          ignoreReadBeforeAssign: false
          }
        ],
        "quote-props": ["error", "as-needed"],
        "quotes": ["error", "single"],
        "semi": "off",
        "space-before-blocks": "error",
        "spaced-comment": ["error", "always"],
        "unused-imports/no-unused-imports": ["error"]
      }
    },
    {
      files: ["**/*.html"],
      extends: [
        ...angular.configs.templateRecommended,
        eslintPluginPrettierRecommended
      ],
      rules: {
        "@angular-eslint/template/button-has-type": "error",
        "@angular-eslint/template/i18n": "off",
        "@angular-eslint/template/prefer-control-flow": "error",
        "prettier/prettier": [
          "error",
          {
            "parser": "angular",
            "endOfLine": "auto"
          }
        ]
      }
    }
);
