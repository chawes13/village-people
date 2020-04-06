const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { loadEnv, loadPublicEnv } = require('./env')
const paths = require('./paths')
const aliases = require('./aliases')
const DotIndexPlugin = require('dot-index-webpack-plugin')
const bourbonIncludePaths = require('bourbon').includePaths
const neatIncludePaths = require('bourbon-neat').includePaths
const exposeEnvMiddleware = require('expose-env-middleware')

loadEnv()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Display full deprecation warnings, if any
process.traceDeprecation = true

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    // Include polyfills
    '@babel/polyfill', 
    // Include compilation error overlay
    'react-dev-utils/webpackHotDevClient',
    paths.jsFolder,
  ],
  output: {
    publicPath: '/'
  },
  resolve: {
    alias: aliases(paths.sourceFolder),
    // Resolve .index files correctly
    mainFiles: ['index', '.index'], 
  },
  module: {
    rules: [
      // This embeds assets smaller than the specified size as data URLs to avoid requests.
      {
        exclude: [
          /\.html$/,
          /\.js$/,
          /\.scss$/,
          /\.json$/,
          /\.svg$/
        ],
        include: paths.sourceFolder,
        use: [
          {
            loader: 'url-loader', 
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ],
      },
      // Process JS with Babel, and a block loader for the styleguide <xmp> tags.
      {
        test: /\.js$/,
        include: paths.sourceFolder,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          'xmp-escape-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: paths.sourceFolder,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  bourbonIncludePaths,
                  neatIncludePaths,
                ]
              }
            }
          }
        ]
      },
      // Use file loader for svgs
      {
        test: /\.svg$/,
        include: paths.sourceFolder,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].svg'
            },
          }
        ],
      }
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list :)
    ]
  },
  plugins: [
    new DotIndexPlugin({
      path: paths.jsFolder,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: paths.htmlTemplate,
    }),
    // Use env from exposeEnvMiddleware
    new webpack.DefinePlugin({
      'process.env': 'window.process.env'
    }),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin(),
    // Hot-reload CSS
    new webpack.HotModuleReplacementPlugin(),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  // Configure the dev server
  devServer: {
    hot: true,
    contentBase: paths.publicFolder,
    // Expose env variables to JS code
    before: app => app.get('/env', exposeEnvMiddleware(loadPublicEnv)),
    // Create API proxy in case we need it.
    proxy: {
      '/proxy': {
        target: process.env.PROXIED_API_URL || '/',
        headers: { Authorization: `Bearer ${ process.env.PROXIED_API_TOKEN || '' }` },
        logLevel: 'debug',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy/': '/'
        }
      }
    },
    compress: true,
    inline: true,
    clientLogLevel: 'none',
    stats: 'minimal',
    historyApiFallback: true,
    watchOptions: {
      ignored: [
        /node_modules/,
        /\.index\.js$/,
      ]
    },
    disableHostCheck: true,
  }
}
