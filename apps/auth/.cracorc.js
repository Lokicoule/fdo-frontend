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
          name: "auth",
          filename: "remoteEntry.js",
          exposes: {
            "./Login": "./src/views/LoginContent",
            "./LogoutButton": "./src/components/LogoutButton",
            "./Register": "./src/views/RegisterContent",
            "./ConfirmRegister": "./src/views/ConfirmRegisterContent",
            "./ForgotPassword": "./src/views/ForgotPasswordContent",
            "./ResetPassword": "./src/views/ResetPasswordContent",
            /*             "./useAuthStore": "./src/store",
            "./PreventAuthRoute": "./src/routes/PreventAuth",
            "./RequireAuthRoute": "./src/routes/RequireAuth", */
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
