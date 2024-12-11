import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { plugins } from './webpack.client';

// Shared configuration
const commonConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
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
  mode: 'development', // Set the mode to development (can also be 'production')
};

// Client-side configuration
const clientConfig = {
  ...commonConfig,
  entry: './src/client/index.ts', // Client entry point
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '../dist/client'),
  },
  plugins,
  target: 'web', // For browser environment
};


// Server-side configuration
const serverConfig = {
  ...commonConfig,
  entry: './src/server/server.ts', // Server entry point
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist/server'),
  },
  target: 'node', // For Node.js environment
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    // Avoid bundling node_modules dependencies for server
    express: 'commonjs express',
  },
};

export default [clientConfig, serverConfig];
