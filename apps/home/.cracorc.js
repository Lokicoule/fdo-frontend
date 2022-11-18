const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;

module.exports = () => ({
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "home",
          filename: "remoteEntry.js",
          remotes: {
            movies: "movies@http://localhost:3000/remoteEntry.js",
          },
          shared: {
            ...deps,
            "auth-provider": {
              singleton: true,
            },
            "auth-routing": {
              singleton: true,
            },
            "auth-ui": {
              singleton: true,
            },
            tsconfig: {
              singleton: true,
            },
            ui: {
              singleton: true,
            },
            hooks: {
              singleton: true,
            },
            form: {
              singleton: true,
            },
            store: {
              singleton: true,
            },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ],
    },
  },
});
