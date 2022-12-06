import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8081/graphql",
  documents: ["src/**/users/**/*.graphql", "src/**/users/**/*.gql"],
  generates: {
    "src/features/users/graphql/__generated__/types.generated.ts": {
      plugins: ["typescript"],
    },
    "src/": {
      plugins: ["typescript-operations", "typescript-react-query"],
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath:
          "features/users/graphql/__generated__/types.generated.ts",
        folder: "__generated__",
      },
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
