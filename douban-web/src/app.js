// 导入react相关的包
import React from 'react'
import ReactDOM from 'react-dom'
// 第二个参数是属性
// const elem1 = React.createElement('h1',{ title:'这个是h1标签' },'你好呀大猪~')
// ReactDOM.render(elem1, document.getElementById('app'))

// 导入组件
// import Hello from './components/Hello.jsx'
// ReactDOM.render(<Hello></Hello>, document.getElementById('app'))

// 导入 ant 的UI组件
// import AntButton from './test/AntButton.jsx'
// ReactDOM.render(<AntButton />, document.getElementById('app'))

// 导入布局容器
// import App from './views/layout/App'
// 配置了别名后 @ 就表示 ./src
// import App from '@/views/layout/App.jsx'
// 自动解析扩展名
import App from '@/views/layout'

import fetchJSONP from 'fetch-jsonp'

// 设置 自己的  baseURL
React.Component.prototype.baseURL = 'http://api.douban.com'
React.Component.prototype.apikey = '0df993c66c0c636e29ecbb5344252a4a'
// 挂载 发起JSONP 请求的 API
React.Component.prototype.$http = fetchJSONP

ReactDOM.render(<App></App>, document.getElementById('app'))
