const commonConfig = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
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