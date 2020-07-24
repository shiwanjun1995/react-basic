// 这个是头部
import React from "react"

// 按需导入 ant 的UI组件
import { Layout } from 'antd';
// 解构 Layout 里面的组件
const { Header} = Layout;

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '这是header组件'
        }
    }
    render() {
        return (
            <Layout>
                <Header>
                    
                </Header>
            </Layout>
        )
    }
}

export default Header