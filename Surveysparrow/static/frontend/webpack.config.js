module.exports = {
  // ... existing config ...
  ignoreWarnings: [
    {
      module: /node_modules\/@atlaskit\/analytics-next-stable-react-context/,
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@atlaskit\/analytics-next-stable-react-context/,
          /node_modules\/@atlaskit/
        ],
      }
    ]
  }
}