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
        在 package.json 文件中先添加一条命令
            "build": "webpack",[执行这条命令的时候会报错信息： ERROR in Entry module not found: Error: Can't resolve './src']
            <!-- "dev": "webpack-dev-server" -->


    3.配置 (https://zhuanlan.zhihu.com/p/32886546)
        webpack4.+以上的版本默认执行的都是约定大于配置的规则 (尽量减少配置文件的体积)
            默认约定了：
                打包的入口是：src/index.js
                打包的输出文件是：dist/main.js
                [配置完上述两条规则后会出现警告信息：WARNING in configuration The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. You can also set it to 'none' to disable any default behavior.]
                新增了mode 选项 可选的配置是 development 和 production ('mode' 选项还未设置。将 'mode' 选项设置为 'development' 或 'production'，来启用环境默认值。)


    4.下载插件


