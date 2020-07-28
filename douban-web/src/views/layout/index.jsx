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
import { HashRouter, Route, Link, Redirect, Switch } from "react-router-dom";
// 导入路由相关的组件
import MovieList from '@/views/pages/movie/children/MovieList'
import MovieDetail from '@/views/pages/movie/children/MovieDetail'
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
                            {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}> */}
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.hash.split('/')[1]||'home']}>
                                <Menu.Item key="home" icon={<UserOutlined />}>
                                    <Link to="/home">首页</Link>
                                </Menu.Item>
                                {/* <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                    <Link to="/movie">movie</Link>
                                </Menu.Item> */}
                                {/* 该组件表示其下包含子菜单 */}
                                <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="电影">
                                    <Menu.Item key="in_theaters">
                                        <Link to="/movieList/in_theaters">正在热映</Link>
                                    </Menu.Item>
                                    <Menu.Item key="coming_soon">
                                        <Link to="/movieList/coming_soon">即将上映</Link>
                                    </Menu.Item>
                                    <Menu.Item key="top250">
                                        <Link to="/movieList/top250">Top250</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key="about" icon={<UploadOutlined />}>
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
                            <Content className="site-layout-background" style={{ margin:'24px 16px', padding:24, minHeight:280 }}>
                                <Route path="/" exact render={() => <Redirect to="/home" />}></Route>

                                {/* Switch 作用：就是 从上到下，依次匹配，如果有一个成功了，就不会继续往下匹配了 */}
                                <Switch>
                                    {/*
                                        当前哈希值为： /movielist/detail/26416062
                                        问题： 这个哈希值可以同时被 一下两个路由规则 同时匹配到。并且，只要匹配到了
                                        组件就会展示

                                        Switch组件作用：
                                            被 Switch 组件包裹的 Route 中，只会有一个被匹配
                                            也就是说：只要第一Route匹配成功了，那么后面的Route就不会再匹配了

                                        路由再配置的时候，应该遵循：
                                        匹配范围小的路由规则再前，匹配返回大的路由规则再后
                                    */}
                                    {/* <Route path="/movieList" component={MovieList}></Route> */}
                                    {/* 注意路由规则出现的顺序 */}
                                    <Route path="/movieList/detail/:id" component={MovieDetail}></Route>
                                    <Route path="/movieList/:movieType" component={MovieList}></Route>
                                </Switch>
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
}

export default App