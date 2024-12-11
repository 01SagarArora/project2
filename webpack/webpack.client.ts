

import { Configuration, HotModuleReplacementPlugin, WebpackPluginInstance, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CssoWebpackPlugin from 'csso-webpack-plugin';


import { ALIAS, DEV_SERVER_PORT, DIST_DIR, SRC_DIR, STATIC_CONTENT_PATH } from '../webpack/constants';

const IS_DEV = true;

const filename = (ext: string): string =>
    (IS_DEV ? `[name].${ext}` : `[name].[chunkhash].${ext}`);

export const plugins: WebpackPluginInstance[] = [
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
        new CssoWebpackPlugin(),
    ]),
];