

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
export const plugins: WebpackPluginInstance[] = [ 
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