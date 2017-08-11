var path = require('path')
var webpack = require('webpack')
// var config = require('./config')

module.exports={
	entry:'./src/main.js',//唯一入口文件 (可以是字符串，数组，对象)
	output:{
        //output最起码要配置这两个
		path:path.resolve(__dirname,'./dist'),//使用__dirname变量获取当前模块文件所在目录的完整绝对路径
        // filename: '[name].js',//根据入口生成的文件名字，如这里入口是main，所以就生成main.js
        filename: 'build.js',//指定的文件名
        publicPath:'/dist/',//这句不能删，删除之后就不会自动编译了，每次都要先webpack，npm run dev
	},
	module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',//用vue-loader去对.vue结尾的文件 进行预处理
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
            //自己加的
            ,
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
            ,
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader!"//！是分隔符
            }
        ]
    },
    //resolver用来找到模块的绝对路径
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'jquery':'jquery'
        }
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devServer: {//webpack-dev-server配置
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        port:9999,//修改端口号，防止与其他进程冲突
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
