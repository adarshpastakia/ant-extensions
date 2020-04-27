// @ts-ignore
module.exports = {
  stories: ["../modules/**/__stories__/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/preset-ant-design",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        craOverrides: {
          fileLoaderExcludes: ["less"]
        }
      }
    },
    "@storybook/addon-docs",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-jest",
    "@storybook/addon-links",
    "@storybook/addon-options",
    "@storybook/addon-contexts",
    "@storybook/addon-storysource",
    "storybook-dark-mode"
  ],
  // @ts-ignore
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader")
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            tsconfigPath: require.resolve("../tsconfig.json")
          }
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  }
};
