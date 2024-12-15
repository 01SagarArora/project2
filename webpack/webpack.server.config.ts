import path from 'path';

// Server-side configuration
export const serverConfig = {
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
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