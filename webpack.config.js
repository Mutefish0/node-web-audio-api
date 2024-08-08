const path = require("path");

module.exports = {
  target: "node", // 指定目标为Node.js环境
  entry: "./wrap.cjs", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "node-web-audio.js", // 输出的文件
    library: "node-web-audio", // 导出库的名称
    libraryTarget: "umd", // 导出库的格式
    globalObject: "this", // 适用于浏览器和Node.js
  },
  externals: {
    "./node-web-audio-api.win32-x64-msvc.node":
      "commonjs ./node-web-audio-api.win32-x64-msvc.node",
    "./node-web-audio-api.win32-arm64-msvc.node":
      "commonjs ./node-web-audio-api.win32-arm64-msvc.node",
    "./node-web-audio-api.darwin-x64.node":
      "commonjs ./node-web-audio-api.darwin-x64.node",
    "./node-web-audio-api.darwin-arm64.node":
      "commonjs ./node-web-audio-api.darwin-arm64.node",
    "./node-web-audio-api.linux-x64-gnu.node":
      "commonjs ./node-web-audio-api.linux-x64-gnu.node",
    "./node-web-audio-api.linux-arm64-gnu.node":
      "commonjs ./node-web-audio-api.linux-arm64-gnu.node",
    "./node-web-audio-api.linux-arm-gnueabihf.node":
      "commonjs ./node-web-audio-api.linux-arm-gnueabihf.node",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    minimize: false, // 压缩输出
    usedExports: true, // 保留被导出的但未使用的代码
    splitChunks: {
      chunks: "all", // 合并所有模块（包括动态导入的模块）
    },
  },
  mode: "production",
};
