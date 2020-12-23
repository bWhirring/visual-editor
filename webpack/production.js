const path = require("path");
const merge = require("webpack-merge");
const ManifestPlugin = require("@dwd/webpack-mainfest");
const WebpackCommon = require("./common");

const production = merge.smart({}, WebpackCommon, {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[hash].js",
    publicPath: "dist/"
  },
  plugins: [new ManifestPlugin()]
});

module.exports = production;
