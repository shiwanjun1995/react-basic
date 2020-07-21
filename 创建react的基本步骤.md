### 快速创建webpack4.x项目

1.运行  npm init -y 快速初始化项目

2.在项目根目录创建 src 文件夹源代码目录（用于存放 react 项目）和 dist 文件夹产品目录（用于存放打包后的文件）

3.在 src 文件夹下创建 index.html 模板文件

4.安装 webpack 和 webpack-cli（此工具用于在命令行中运行 webpack）

5.安装完成后会提示你 `ERROR in Entry module not found: Error: Can't resolve './src' 需要在src下添加一个index.js默认的打包入口文件`

6.webpack默认只会对js文件进行打包 安装和html有关的loader和插件来处理html

7.安装简单的web服务器 并添加热加载 webpack-dev-server 在package.json 文件内配置快捷方式

### 安装react有关的包

1. cnpm i react react-dom --save (项目运行必备的)
   * 这两个包 第一个是react的核心库（专门用于创建组件和虚拟DOM的 同时组件的生命周期都在这个包里）
   * 第二个是提供与DOM相关的功能的包（专门用于进行操作DOM的 最主要的应用场景就是 ReactDOM.render()）

2. 在入口文件 导入这两个包
   * import React from 'react' 创建组件 虚拟dom 生命周期
   * import ReactDOM from 'react-dom' 把创建好的组件 和 虚拟dom 渲染到页面上去

3. React.createElement() 方法 该方法会进行预检查 帮助我们创建一个无错代码 创建一个虚拟dom元素
   * 参数1：创建的元素类型 例如 h1标签
   * 参数2：创建的元素的属性 例如 title属性
   * 参数3：创建的元素的文本子节点

4. 使用ReactDOM.render() 方法 渲染虚拟dom元素到界面上 注意第二个元素为dom元素

### JSX语法

```js
1. 安装babel插件 可以将es2015转换为es5
   cnpm i babel-core babel-loader babel-plugin-transform-runtime(在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数，例如 _extend。babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小) --save -dev(项目部署后不需要的)
   cnpm i babel-preset-env(babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件) babel-preset-stage-0 --save-dev(项目开发环境中需要的)
   [ERROR in ./src/index.js
   Module build failed (from ./node_modules/babel-loader/lib/index.js):
   Error: Plugin/Preset files are not allowed to export objects, only functions...]

2. 安装能够识别jsx语法的插件
   cnpm i babel-preset-react -D
```

以上的安装规则会报错 以下的是最新的babel配置规则

1. 去官网查找最新的babel插件安装规则
   cnpm i @babel/core babel-loader @babel/runtime[--save] @babel/plugin-transform-runtime(减小代码体积)
   cnpm i @babel/preset-env(处理es2017以前) @babel/plugin-proposal-class-properties(处理class类)[--save-dev]
   cnpm i @babel/plugin-proposal-class-properties(处理js新特性 es6 class)

2. 配置.babelrc
   ```js
   {
      "presets": ["@babel/env", "@babel/react"],
      "plugins": ["@babel/transform-runtime"]
   }
   ```

3. 在js里面书写类似html的代码 这个就叫做 jsx 语法 符合 XML 规范的 JS 本质是内部先把数据转成了React.createElement()这种新式 然后再渲染的
   * 任何有关js表达式的语句都应该放在 {} 内
   * 为了便于阅读 建议将内容包裹在 () 中 避免自动插入;陷阱
   * 在属性中嵌入js表达式时 要么使用引号（字符串值）或者大括号（对于表达式）中的一个 不能同时使用者两种符号 另外jsx语法上更接近js而不是html 所以ReactDOM使用cameCase来定义属性名称 而不是使用html属性名称
      class属性为className
      for属性为htmlFor
      colSpan属性为colSpan
   * 在jsx语法中 标签必须成对出现 单标签必须自闭和

在jsx语法的编译过程中 如果碰到了<就把它当成html去编译 如果碰到了{}就把它当成js去编译

### react中创建组件

1. 函数组件
   使用构造函数来创建组件 如果要接收外界传过来的数据 在构造函数的参数列表中使用 props(对象) 来接收 必须要向外return[如果要写jsx语法建议使用()括起来避免换行导致没有返回值的情况]一个合法的JSX创建的虚拟DOM props 不能修改 组件必须有个根元素

2. class组件
   使用 class 组件名（首字母大写）extends React.component{render() {符合jsx语法的dom元素}}
   [extends] 让前面的这个组件继承后面 React.Component这个类的所有属性和方法 组件类的第一个字母必须大写

总结：
   用构造函数创建出来的组件 叫做无状态组件
   用class关键字创建出来的组件 叫做有状态组件
   本质区别是有无state属性

### 给组件的事件绑定this
   在事件内部直接取this的话 是会出现 undefined 需要确保事件内的this指向的是组件实例
* 在构造函数中绑定this ```js this.someMethod=this.someMethod.bind(this)```
* 使用箭头函数 箭头函数在组件中使用的时候 this的指向就被定义了 这个时候指向的就是组件实例
* 在绑定事件的时候手动绑定this

### 受控组件(controlled)和非受控组件(uncontrolled)

受控组件：像input、textarea这些表单元素通常会保持自己的状态并根据用户的输入更新。在react中通常将状态保存在组件的state属性中  并且仅使用setState()更新 这种由react控制其值的输入表单元素称为“受控组件”

非受控组件：在dom中保留了数据 可以通过操作dom来获取value 虽然这样会减少一部分代码 但是将react代码和非react代码混在了一起 虽然快速但是对于有代码洁癖的人来说是无法忍受的 总之尽量使用受控组件

 A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.

value 需要根据input的类型而设置初始值否则会抛出上面这个错误

### React 引入css 需要安装处理css的loader插件

1. style-loader
2. css-loader

配置规则
```js
   { test: /\.css$/, use: ['style-loader','css-loader']}

   注意点：react模块化引入外部css不生效的问题
   原因：webpack配置css的loader的时候 默认不开启模块化 这种模块化方式的引入需要修改配置 有两个解决办法
   1.{ test: /\.css$/, use: ['style-loader','css-loader?modules'] }
   2.{ test: /\.css$/, use: ['style-loader',{ loader: 'css-loader', options: { modules: true } }] }
```

总结：webpack默认只会处理js文件 如何让其处理css样式文件 需要安装对应的第三方loader
      需要安装以上两个loader 浅析webpack处理第三方文件类型的过程：
   第一步： 如果要处理的这个文件不是js文件 就会去webpack的配置文件中去查找有没有对应的第三方loader规则
   第二步：如果能够找到对应的配置规则的话 就会调用对应的loader来处理这种文件类型
   第三步：在调用loader的过程中 是从后往前来进行调用 所以style-loader需要写在css-loader的前面
   第四步：当最后一个loader调用完毕 会把处理的结果 直接交给webpack进行打包合并 最终输出到bundle.js中去

### React 中引入第三方css包
   cnpm i element-react --save
   cnpm i element-theme-default --save

配置规则
```js
   配置处理字体格式的loader规则 可以去第三方dist目录下的 fonts下去查找有多少种类型 一般不外乎以下几种
   { test: /\.ttf|woff|woff2|eot|svg$/, use: 'url-loader' }
```

### 组件中内置校验props的插件

cnpm i -S prop-types

使用规则
```js
   static propTypes = {
      // 设置默认值
      name: PropTypes.string,
      // 类型检测
      age: PropTypes.number,
      gender: PropTypes.oneOf(['男','女']),
   }
```