const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
     entry: './entry.js',
    //entry: './thirdPartyEntry.js',          //uncomment for third party files
    // entry: './indexEntry.js',          //uncomment for index files
    output: {
        path: __dirname,
        filename: 'bundle.js'
        //filename: 'externalBundle.js'                //uncomment for third party files
        // filename: 'indexBundle.js'                     //uncomment for index files
    },
    module:{
        loaders: [
            {test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        new MinifyPlugin({}, {})
    ]
}