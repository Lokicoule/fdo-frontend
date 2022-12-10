import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8084/graphql",
  documents: ["src/**/product/**/*.graphql", "src/**/product/**/*.gql"],
  generates: {
    "src/features/product/graphql/product.client.ts": {
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
