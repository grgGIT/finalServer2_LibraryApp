const path = require('path');

module.exports = {
    entry: {
    app: './client/components/BookGrid.jsx',
    login: './client/login.jsx',
    card: './client/components/BookCard.jsx',
    thread: './client/components/ReviewThread.jsx',
    user: './client/components/UserAccount.jsx',
    wallet: './client/components/Wallet.jsx',
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                 exclude: /node_modules/,
                 use: {
                     loader: 'babel-loader',
                 },
            },
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};