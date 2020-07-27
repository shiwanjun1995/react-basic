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

// 导入路由
import { BrowserRouter, HashRouter, Route, Link, Redirect } from "react-router-dom";
// 导入路由相关的组件
import Movie from '@/views/pages/movie/Movie'
import About from '@/views/pages/about/About'
import Home from '@/views/pages/home/Home'

// 解构 Layout 里面的组件
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

// 导入 根组件需要的 样式表
import '@/assets/css/app.scss'


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
            <HashRouter>
                <div style={{ height:'100%' }}>
                    {/* <h1>{ this.state.msg }</h1> */}
                    <Layout style={{ minHeight:'100vh', height:'100%' }}>
                        {/* 侧边栏 */}
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                            {/* logo */}
                            <div className="logo">
                                {/* <img src="$assets/images/logo.png" /> */}
                                <img src={require('$assets/images/logo.png').default} />
                            </div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    <Link to="/home">首页</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                    <Link to="/movie">movie</Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<UploadOutlined />}>
                                    <Link to="/about">关于</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        {/* 主体区域 */}
                        <Layout className="site-layout">
                            {/* 主体区域的header */}
                            <Header className="site-layout-background">
                                { React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,
                                }) }
                                {/* {this.onToggleEle()} */}
                            </Header>
                            {/* 主体区域的content */}
                            <Content
                                className="site-layout-background"
                                style={{ margin:'24px 16px', padding:24, minHeight:280 }}
                            >
                                <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
                                <Route path="/movie" component={Movie}></Route>
                                <Route path="/about" component={About}></Route>
                                <Route path="/home" component={Home}></Route>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </HashRouter>
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