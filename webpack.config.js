var webpack = require('webpack')
var path = require('path')

module.exports = {
    output: {
        filename: "bundle.js"
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                use: ["style-loader","css-loader","less-loader"]
            }
        ]
    }
}