const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const client = {
    
    entry: {
            "client": path.resolve(__dirname, 'client/js/client.boostrap.jsx')
    },
    
    resolve: {
        modules: [
              path.resolve(__dirname, "client/js")
            , path.resolve(__dirname, "client/css")
            , "node_modules"],
    },
    
    output: {
            path: path.resolve(__dirname, 'public'),
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
                    use: ExtractTextPlugin.extract({use: [
                        {
                            loader: 'css-loader',
                            options: { 
                                root: '.' 
                            }
                        },
                        'sass-loader'
                    ]})
                }
            ]
    },
    
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
    
    
};


const server = {
    
    entry: {
            "server": path.resolve(__dirname, 'client/js/server.bootstrap.jsx')
    },
    
    target: 'node',
    
    resolve: {
        modules: [
              path.resolve(__dirname, "client/js")
            , path.resolve(__dirname, "client/css")
            , "node_modules"],
    },
    
    output: {
            path: path.resolve(__dirname, 'public'),
            filename: '[name].bundle.js',
            library: "THIICalExport",
            libraryTarget: 'commonjs'
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
                    use: ExtractTextPlugin.extract({use: [
                        {
                            loader: 'css-loader',
                            options: { 
                                root: '.' ,
                                modules: true,
                                localIdentName: '[path][name]_[local]--[hash:base64:8]',
                            }
                        },
                        'sass-loader'
                    ]})
                }
            ]
    },
    
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
    
};

module.exports = [client, server];