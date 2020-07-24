console.log('我是App.jsx页面');
import React from "react"

// 按需导入 ant 的UI组件
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

// 解构 Layout 里面的组件
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

// 导入 根组件需要的 样式表
import '@/css/app.scss'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '我是首页',
            collapsed: false,
        }
        // this.onCollapse = this.onCollapse.bind(this)
    }
    render() {
        return (
            <div>
                {/* <h1>{ this.state.msg }</h1> */}
                <Layout style={{ minHeight: '100vh' }}>
                    {/* 侧边栏 */}
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<UserOutlined />}>
                                选项1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                选项2
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UploadOutlined />}>
                                选项3
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    {/* 主体区域 */}
                    <Layout className="site-layout">
                        <Header className="site-layout-background">
                            { React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            }) }
                            {/* {this.onToggleEle()} */}
                        </Header>
                    </Layout>
                </Layout>
            </div>
        );
    }
    // methods
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    // 主体区域展开
    onToggleEle = () => {
        return React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
        })
    }
    // onCollapse = collapsed => {
    //     console.log(collapsed)
    //     // this.setState(pState => ({
    //     //     collapsed: pState.collapsed
    //     // })
    //     this.setState({
    //         collapsed
    //     })
    // }
}

export default App