const path = require('path')
const HTmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 必须要有 mode 属性, 有两个可选值：  development   production
    mode: 'development',
    // 入口节点
    entry: {
        // entry的默认值是 ./src 由于默认读取的是 index.js 所以 可以直接不写
        app: './src/app.js'
    },
    // 输出节点
    output: {
        // output.path 的默认值是 ./dist
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    // 插件
    plugins: [
        new HTmlWebpackPlugin({
            title: '每次编译会自动在内存中生成一个html文件',
            filename: 'index.html', // 指定的在内存中生成的首页文件名称
            template: path.join(__dirname, './src/index.html'), // 指定模板文件的相对或绝对路径 根据谁生成的
        })
    ],
    // 模块对象 里面的选项决定了如何处理项目中的不同类型的模块
    module: {
        //  创建模块是 匹配的规则数组 这些规则能够对模块应用loader或者修改解析器
        rules: [
            // 处理最新的js书写代码方式 兼容低级浏览器的语法
            // 一定要添加排除项 否则打包会很大
            // { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }, // 打包的时间是 587ms 左右
            // cacheDirectory 将 babel-loader 提速至少两倍。 这会将转译的结果缓存到文件系统中 之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程
            { test: /\.(js|jsx)$/, use: ['babel-loader?cacheDirectory'], exclude: /node_modules/ }, // 加了这个字段后 优先读取缓存 打包的时间减少为 367ms 左右
            // 处理普通css样式表
            // loaders 可以链式编程通过多个loaderss 从右到左形成一种依赖性(也就是说最先配置的要放在最右边 这里 style-loader 依赖 css-loader)
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 处理sass
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 .scss 样式表的loader
            // 处理图片
            { test: /\.(jpg|jpeg|png|gif|svg)$/, use: ['url-loader'] },
            // 处理字体
            { test: /\.(eot|otf|woff|woff2|ttf)/, use: ['url-loader'] },
        ]
    },
    // https://www.webpackjs.com/configuration/resolve/#resolve-alias
    // 模块解析对象 这些选项能设置模块如何被解析
    resolve: {
        // 创建 inport/require 的别名 来确保模块引入变得简单 起别名
        alias: {
            // 配置 src
            '@': path.resolve(__dirname, './src/'),
            // 配置 assets
            '$assets': path.resolve(__dirname, './src/assets/'),
            // 配置images
            '$img': path.resolve(__dirname, './src/assets/images'),
        },
        extensions: ['.js', '.jsx', '.json', '.css', '.scss']
    },
    // 开发中的 行为选项
    devServer: {
        port: 8088, // 启用的端口号
        // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
        proxy: {
            "/api": {
                // 代理的目标服务器地址
                // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
                // 例如： 请求到 /api/movie/in_theaters 现在会被代理到请求 http://api.douban.com/v2/movie/in_theaters
                target: "http://api.douban.com/v2",
                // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：
                secure: false,
                // 必须设置该项
                changeOrigin: true,
                pathRewrite: {"^/api" : ""}
              }
        }
    }
}