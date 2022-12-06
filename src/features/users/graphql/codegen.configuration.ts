import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8081/graphql",
  documents: ["src/**/users/**/*.graphql", "src/**/users/**/*.gql"],
  generates: {
    "src/features/users/graphql/users.client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          func: "../../../libs/graphql-fetcher#fetchData",
        },
        withHooks: true,
      },
    },
  },
};

export default config;
