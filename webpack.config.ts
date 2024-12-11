import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { plugins } from './webpack/webpack.client';

const configs: any[] = []
// Shared configuration
const commonConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,  // Handle .css files
        use: [
          'style-loader',  // Injects styles into the DOM
          'css-loader',    // Translates CSS into JavaScript
        ],
      },
    ],
  },
};

// Client-side configuration
const clientConfig = {
  ...commonConfig,
  entry: './src/client/index.ts', // Client entry point
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist/client'),
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
    path: path.resolve(__dirname, 'dist/server'),
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


const IS_DEV = false;

if (process.env.NO_SSR === 'true') {
  configs.push(clientConfig);
} else {
  configs.push(serverConfig);

  if (!IS_DEV) {
    configs.push(clientConfig);
  }
}


export default configs;