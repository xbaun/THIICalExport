const path = require('path');

const client = {
    
    entry: {
            "index": path.resolve(__dirname, 'client/js/index.jsx')
    },
    
    resolve: {
        modules: [
              path.resolve(__dirname, "client/js")
            , path.resolve(__dirname, "client/css")
            , "node_modules"],
    },
    
    output: {
            path: path.resolve(__dirname, 'public/js'),
            filename: '[name].bundle.js',
            library: "THIICalExport"
    },
    
    module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets:["react", "es2015", "stage-0"]
                        }
                    }
                },
                {
                    test: /\.scss/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { root: '.' }
                        },
                        'sass-loader'
                    ]
                }
            ]
    }
    
};

module.exports = [client];