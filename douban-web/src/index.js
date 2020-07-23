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
import AntButton from './components/AntButton.jsx'
ReactDOM.render(<AntButton />, document.getElementById('app'))
