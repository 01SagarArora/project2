// Core Node.js modules
import path from 'path';
import { fileURLToPath } from 'url';

// Third-party libraries
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// Type definitions
import { WebpackPluginInstance } from 'webpack';

// Other imports (e.g., from `webpack`)
import pkg from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { HotModuleReplacementPlugin, DefinePlugin } = pkg;

const IS_DEV = false;
const STATIC_CONTENT_PATH = 'pagination';

const plugins: WebpackPluginInstance[] = [
    new DefinePlugin({
        NO_SSR: process.env.NO_SSR === 'true',
    }),
    ...(process.env.NO_SSR === 'true' ? [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
          }),
    ] : []),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: IS_DEV ? `${STATIC_CONTENT_PATH}css/[name].css` : `${STATIC_CONTENT_PATH}css/[name].[contenthash].css`,
    }),
    new LoadablePlugin(
        {
            filename: 'stats.json',
            writeToDisk: true,
        }) as { apply(): void; },
    ...(IS_DEV ? [
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ] : [
    ]),
];


// const configs: any[] = []

// export default configs;

export const configs: any[] = []
// Shared configuration test
const commonConfig = {
  resolve: {
    extensions: ['.tsx','.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader'], // First apply css-loader, then style-loader
      },
    ],
  },
};

// Client-side configuration
const clientConfig = {
  ...commonConfig,
  entry: './src/index.tsx', // Client entry point
  output: {
    filename: 'client.cjs',
    path: path.resolve(__dirname, '../dist/client'),
  },
  mode: 'development', // Development mode disables minification by default
  optimization: {
    usedExports: false,
    minimize: false, // Disable minification
  },
  plugins:plugins,
  target: 'web', // For browser environment
};


// Server-side configuration
const serverConfig = {
  ...commonConfig,
  entry: './src/server/server.ts', // Server entry point
  output: {
    filename: 'server.cjs',
    path: path.resolve(__dirname, '../dist/server'),
  },
  mode: 'development', // Development mode disables minification by default
  optimization: {
    minimize: false, // Disable minification
  },
  target: 'node', // For Node.js environment
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx','.ts', '.js', '.jsx'],
    alias: {
      '@middlewares': path.resolve(__dirname, 'src/server/middlewares'),
    },

  },
  externals: {
    // Avoid bundling node_modules dependencies for server
    // express: 'commonjs express',
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
};



if (process.env.NO_SSR === 'true') {
  configs.push(clientConfig);
} else {
  configs.push(serverConfig);

  if (!IS_DEV) {
    configs.push(clientConfig);
  }
}

export default configs;