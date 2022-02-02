const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, 'src', 'app.tsx'),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
}