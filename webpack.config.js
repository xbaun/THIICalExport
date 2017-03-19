const path = require('path');

const client = {
    
    entry: {
            "index": path.resolve(__dirname, 'client/index.js')
    },
    output: {
            path: path.resolve(__dirname, 'public/js'),
            filename: '[name].bundle.js',
            library: "THIICalLib"
    },
    module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader'
            }]
    }
    
};




module.exports = [client];