const paths = require('path');


module.exports = {
    entry: './src/app.js',
    output: {
        path: paths.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheep-module-eval-source-map',
    devServer: {
        contentBase: paths.join(__dirname, "public")
    }
};