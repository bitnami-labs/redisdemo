module.exports = {
  devServer: {
    host: process.env.APP_HOST || "localhost",
    port: process.env.APP_PORT || 8080,
    public: process.env.APP_FQDN || "localhost",
  },
  entry: {
    javascript: "./app/js/app.jsx",
    html: "./app/index.html"
  },
  output: {
    path: __dirname + "/../dist",
    filename: "/js/app.js"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify(
          {
            presets: ['react', 'es2015'],
            "plugins": [
              "syntax-class-properties",
              "syntax-decorators",
              "syntax-object-rest-spread",

              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        )]
      }
    ]
  }
};
