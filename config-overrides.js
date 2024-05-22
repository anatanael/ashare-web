const { override } = require("customize-cra");
const { addBabelPlugin, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addBabelPlugin([
    "module-resolver",
    {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  ]),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
);
