import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
  ],
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

export default [clientConfig, serverConfig];
