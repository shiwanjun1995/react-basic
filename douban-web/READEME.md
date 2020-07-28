## 如何新建一个 webpack4 + react 的项目

    1.安装
        快速初始化一个项目
            npm init -y
        安装 webpack 最新的版本
            cnpm i --save-dev webpack
            *** (devDependencies 实际开发过程中必须的依赖 项目在部署到服务器的时候是不需要的 缩写为 cnpm i -D )
        如果使用 webpack4+ 版本 还需要安装 CLI
        	***（此工具用于在命令行中运行webpack）
            cnpm i -D webpack-cli


    2.运行
        考虑到用CLI(这种脚本的命令)来运行本地的webpack不是很方便 我们可以设置一个快捷方式 在package.json文件中添加 npm 脚本
        在 package.json 文件中先添加一条命令
            "build": "webpack",[执行这条命令的时候会报错信息： ERROR in Entry module not found: Error: Can't resolve './src' 缺少打包的入口文件]
            "start": "webpack-dev-server"
            <!-- "dev": "webpack-dev-server" -->


    3.配置 (https://zhuanlan.zhihu.com/p/32886546)
        webpack4.+以上的版本默认执行的都是约定大于配置的规则 (尽量减少配置文件的体积)
            默认约定了：
                打包的入口是：src/index.js
                打包的输出文件是：dist/main.js
                [配置完上述两条规则后会出现警告信息：WARNING in configuration The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior.]
                新增了mode 选项 可选的配置是 development 和 production ('mode' 选项还未设置。将 'mode' 选项设置为 'development' 或 'production'，来启用环境默认值。)
            修改默认的入口节点：(这里修改为入口节点为 app.js 之前是src/index.js)
                entry: {
                    './src/app.js'
                }
            修改默认的输出节点：(这里修改输出节点的path路径并添加最后输出的文件名)
                output: {
                    path: path.resolve(__dirname, './dist'),
                    filename: '[name].js' // 这个里面配置的 name 值就是 上面入口书写的属性名 app
                }
        .babelrc 文件的配置
            这个配置的文件是一个json文件 .rc结尾的文件通常代表运行时自动加载的文件 在Babel执行编译的过程中 会从项目的根目录下的 .babelrc 文件中读取配置
            babel6.X版本之后，所有的插件都是可插拔的，也就是说只安装babel依然无法正常的工作，我们需要配置对应的.babelrc文件才能起作用。
            该文件需要的配置项主要有预设(presets)和插件(plugins) 每一个配置都是一个 Array 类型的参数 比如：
            {
                "presets": [["@babel/env",{options}],"@babel/react"], // 每一个配置型里面又是一个 array
                "plugins": ["@babel/plugin-transform-runtime"]
            }


    4.下载插件
        首先下载一个简单的 web 服务器 webpack-dev-server
        cnpm i -D webpack-dev-server
        管理资源 webpack 最出色的功能之一就是 除了 js 还可以通过不同的 loader 来引入任何其他类型的文件(因为 webpack 默认只会对js进行打包 其他类型的文件需要引入对应的loader来进行处理)
        cnpm i -D style-loader css-loader(注意书写的顺序 最左边的依赖最右边的 这里 style-loader 依赖 css-loader 所以安装 css-loader 是第一的前提条件)
        cnpm i -D url-loader(处理图片 字体等的loader) [file-loader和url-loader的区别 https://www.cnblogs.com/cowboybusy/p/10620176.html] 需要注意的是 url-loader 往往需要依赖一个 file-loader 尽管在配置文件里面没有配置
        cnpm i -D file-loader(处理图片 字体等的loader)
        cnpm i -D html-webpack-plugin(处理html 每次会在内存中自动生成一个首页文件名称[需要指定模板文件的路径 是根据谁生成的] 不用手动引入打包后的main.js文件)
        url-loader 这个loader可以接收并加载任何文件 然后将其输出到构建目录中 也就是说还可以处理字体文件

        babel相关的插件(https://zhuanlan.zhihu.com/p/61780633)
        babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5 也就是把高级的语法转换成可以兼容低级浏览器的语法
        @babel/core 这个插件的作用是将js转换成AST的形态 方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js
        @babel/preset-env 可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5
        @babel/plugin-transform-runtime(https://zhuanlan.zhihu.com/p/86746720 几个插件的差别) 抽离运行时重复的函数作为模块复用 减少代码体积 babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。 默认情况下会被添加到每一个需要它的文件中你可以引入 babel runtime 作为一个独立模块，来避免重复引入。下面的配置禁用了 babel 自动对每个文件的 runtime 注入，而是引入 babel-plugin-transform-runtime 并且使所有辅助代码从这里引用。
        @babel/runtime 转换插件通常仅在开发中使用，但是运行时本身将取决于部署的代码。 cnpm i -S @babel/runtime

        react相关的插件(https://www.npmjs.com/package/react-dom)
        cnpm i -S react react-dom
        react 专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
        react-dom 专门进行DOM操作的，最主要的应用场景，就是`ReactDOM.render()

        处理jsx语法的插件
        cnpm i -D @babel/preset-react

        下载ant design UI组件
        cnpm i - S antd
        借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
        cnpm i -D babel-plugin-import 按需加载所需要用到的插件
        cnpm i -D less antd 的样式使用了 Less 作为开发语言，并定义了一系列全局/组件的样式变量
        cnpm i -D sass-loader node-sass 安装加载和转译 SASS/SCSS 文件

        安装能够处理es6新特性 es7 es8 等语法的插件 另外还需要去 .babelrc 文件中进行该插件相应的配置
        cnpm i -D @babel/plugin-proposal-class-properties


    5.项目结构
    ---- views 存放的是页面相关性的文件
    ------ layout 存放的是页面的布局文件
    ------ pages 存放的是页面文件
    -------- login 登录页文件夹
    ---------- Login.jsx 登录页
    src
        |-- assets            // 静态资源
        |-- components        // 公共组件目录 当业务需要拆分组件的时候，可以在对应的业务文件夹下单独创建一个components文件夹
        |-- models            // 公共model存放位置
            |-- index.js        // model 入口文件，所有的业务model都需要在这里登记才可以使用
        |-- views             // 容器组件
            |-- layout        // 页面布局文件
            |-- pages         // 具体的业务页面
                |-- demo          // 业务容器
                |-- DemoPage.jsx  // 业务入口 我们约定入口文件后都带一个“Page”字样
                |-- DemoPage.less // 业务样式
        |-- services          // 公共api存放
        |-- utils             // 工具
        |-- global.less       // 样式变量 方法
        |-- index.js          // 入口文件
        |-- index.less        // 全局样式 覆盖样式
        |-- router.js         // 基础路由


    6.安装路由
    cnpm i -S react-router-dom
    import { BrowserRouter, Route, Link } from "react-router-dom";
    BrowserRouter主要使用在浏览器中，也就是WEB应用中。它利用HTML5 的history API来同步URL和UI的变化。当我们点击了程序中的一个链接之后,BrowserRouter就会找出与这个URL匹配的Route，并将他们对应的组件渲染出来。 BrowserRouter是用来管理我们的组件的，那么它当然要被放在最顶级的位置，而我们的应用程序的组件就作为它的一个子组件而存在。


    7.发起请求
    cnpm i -S fetch-jsonp
    这个是基于 promise 规范的 fetch Api fetch这个API是专门用于发起请求的



