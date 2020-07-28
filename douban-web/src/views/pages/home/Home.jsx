import React from 'react'

// 导入home组件需要的样式表
import '@/assets/css/home'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <div className="img-box">
          <img src={require('$assets/images/fenche.png').default} />
        </div>
        <h1 style={{fontSize:36}}>这个是home页面</h1>
      </div>
    )
  }
}