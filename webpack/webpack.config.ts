// Core Node.js modules
import path from 'path';
import { fileURLToPath } from 'url';

// Third-party libraries
import { Configuration } from 'webpack';
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
      template: './src/assets/index.html',
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

export const configs: any[] = []

// Shared configuration 
const commonConfig: Configuration = {
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  optimization: {
    usedExports: false,
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// Client-side configuration
const clientConfig: Configuration = {
  ...commonConfig,
  entry: './src/index.tsx', // Client entry point
  output: {
    filename: 'client.cjs',
    path: path.resolve(__dirname, '../dist/client'),
  },
  plugins,
  target: 'web', // For browser environment
};

// Server-side configuration
const serverConfig: Configuration = {
  ...commonConfig,
  entry: './src/server/server.ts', // Server entry point
  output: {
    filename: 'server.cjs',
    path: path.resolve(__dirname, '../dist/server'),
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@middlewares': path.resolve(__dirname, 'src/server/middlewares'),
    },

  },
  externals: [],
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