var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    context: SRC_PATH,
    entry: {
        "bundle.valis": ['jquery', 'bootstrap', 'ztree'],
        "pageIndex/mainPage": './main/index'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js',
        // publicPath: path.resolve(DIST_PATH,'/asset'),     //webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
        // ,chunkFilename: "chunk.[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                favicon: 'img/logo.ico', //favicon路径
                template: 'index.html',    //html模板路径
                inject: true,    //允许插件修改哪些内容，包括head与body
                // hash: true,    //为静态资源生成hash值
                minify: {    //压缩HTML文件
                    removeComments: true,    //移除HTML中的注释
                    collapseWhitespace: false    //删除空白符与换行符
                }
            }
        ),
        new webpack.ProvidePlugin({
            // $: 'jquery',    // 会被打包进entry里面
            // jQuery: 'jquery'
            // WdatePicker : 'WdatePicker'
        }),
        new ExtractTextPlugin("css/[name].[chunkhash].css"),
        new WebpackMd5Hash() // 解决修改css改变js的hash问题
        // ,new webpack.optimize.UglifyJsPlugin() // 代码压缩plugin
        // ,new HtmlWebpackPlugin()
        // ,new webpack.optimize.CommonsChunkPlugin('common.js',[])  // // 用于多个HTML页面的时候，默认会把所有入口节点的公共代码提取出来,生成一个common.js ，必须遵循commonJS吗？
        //  { minChunks: 3,
        //      name: "common-app.chunk",
        //      chunks: ["home", "detail", "list"]}
    ],
    module: {
        // noParse : ["WdatePicker"],
        loaders: [
            // {test: /\.css$/, loader: 'style!css'},   // 将CSS一起打包进js文件
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},  // 将CSS文件提取出来
            // { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },    //从 npm 模块中将 jquery 挂载到全局
            // {test: require.resolve('bootstrap'), loader: 'expose?bootstrap'}    //将bootstrap暴露到全局
        ]
    },
    resolveLoader: {
        // root: path.join(__dirname, "node_modules")
    },
    resolve: {
        extensions: ['.js', ''],
        alias: {  // 别名，提高搜索效率，打包效率
            'jquery': path.resolve(SRC_PATH, './libs/jquery'),
            'bootstrap': path.resolve(SRC_PATH, './libs/bootstrap/js/bootstrap'),
            'ztree': path.resolve(SRC_PATH, './libs/zTree/js/jquery.ztree.all'),
            'WdatePicker': path.resolve(SRC_PATH, './libs/My97DatePicker/WdatePicker')
        }
    },
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // },
    // devtool: 'source-map'
}




