var path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        filename: "lazyload.js",
        libraryTarget: "var",
        library: "Lazyload"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel?presets[]=es2015'
        }]
    }
}
