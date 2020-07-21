const path = require('path')
const HTmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 必须要有 mode 属性, 有两个可选值：  development   production
    mode: 'development',
    // 插件
    plugins: [
        new HTmlWebpackPlugin({
            title: '每次编译会自动在内存中生成一个html文件',
            filename: 'index.html', // 指定的在内存中生成的首页文件名称
            template: path.join(__dirname, './src/index.html'), // 指定模板文件的相对或绝对路径
        })
    ],
    // 模块对象 里面的选项决定了如何处理项目中的不同类型的模块
    module: {
        //  创建模块是 匹配的规则数组 这些规则能够对模块应用loader或者修改解析器
        rules: [
            // 处理普通css样式表
            // loaders 可以链式编程通过多个loaderss 从右到左形成一种依赖性(也就是说最先配置的要放在最右边 这里 style-loader 依赖 css-loader)
            { test: /.css$/, use: ['style-loader', 'css-loader'] },
            // 处理图片
            { test: /(.jpg|jpeg|png|gif)$/, use:['url-loader'] }
        ]
    }
}