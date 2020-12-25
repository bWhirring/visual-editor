const path = require("path")
const { merge } = require("webpack-merge")
const ManifestPlugin = require("webpack-manifests")
const WebpackCommon = require("./common")

const production = merge({}, WebpackCommon, {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[hash].js",
    publicPath: "dist/"
  },
  plugins: [new ManifestPlugin()]
})

module.exports = production
