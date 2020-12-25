const path = require("path")
const mode = process.env.NODE_NEV || "development"

module.exports = {
  mode,
  entry: path.resolve(__dirname, "../src/index"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: "dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve(__dirname, "../node_modules")],
    alias: {
      '@utils': path.resolve(__dirname, '../src/utils/'),
      '@apis': path.resolve(__dirname, '../src/apis/'),
      '@actions': path.resolve(__dirname, '../src/actions/'),
      '@components': path.resolve(__dirname, '../src/components/'),
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: path.resolve(__dirname, "../node_modules"),
        loader: 'babel-loader'
      },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, "../node_modules"),
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["autoprefixer",]
                ]
              }
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "../node_modules"),
        loader: "style-loader!css-loader"
      }
    ]
  }
}
