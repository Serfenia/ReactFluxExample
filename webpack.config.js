var path = require('path')
  , webpack = require('webpack');

var isProduction = (process.env.NODE_ENV === 'production')
  , isDev = !isProduction;

var config = {
  entry: [
    './client/main'
  ],
  output: {
    path: path.join(__dirname, 'client/output'),
    filename: 'bundle.js',
    publicPath: '/client/'
  },
  resolve: {
    extensions: ['','.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};

if(isDev) {
  config.output.publicPath = 'http://localhost:8090/client/';

  config.entry.push(
    'webpack-dev-server/client?http://localhost:8090',
    'webpack/hot/dev-server'
  );

  // Add the HotModuleReplacementPlugin to support hot module replacement
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );

  // we need to add the react-hot loader here with the jsx loader to support hot module replacement
  config.module.loaders.push(
    { test: /\.js$/, loaders: ['react-hot', 'jsx', 'babel'] , exclude: /.*\/node_modules\/.*/}
  )
}


if(isProduction) {
  // we need to add the jsx loader without react-hot for production
  config.module.loaders.push(
    { test: /\.js/, loaders: ['jsx', 'babel'] }
  )

  config.plugins.push(
    new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify('production')}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;