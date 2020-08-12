// 这个是登录页
import React from 'react'

import { Button, Input, message } from 'antd'

import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';

// 导入登录页的样式表
import '@/assets/css/login.scss'

// 导入路由
import {Route, BrowserRouter as Router, HashRouter, BrowserRouter} from "react-router-dom";

let router = new Router();

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginForm: {},
            userName: '',
            password: '',
            inputType: 'password',
        }
    }
    render() {
        return (
            <div className="login-container">
                <div className="snow-mask"></div>
                <div className="login-header">
                    <h1>豆瓣电影React系统</h1>
                </div>
                <div className="login-box">
                    <form className="login-form">
                        <h2>登录</h2>
                        <div className="login-content">
                            <div className="content-item">
                                <UserOutlined />
                                <Input placeholder="请输入用户名" onChange={() => this.handelChangeU(event)} defaultValue={this.state.userName} />
                            </div>
                            <div className="content-item">
                                <LockOutlined />
                                <Input placeholder="请输入密码" type={this.state.inputType} onChange={() => this.handelChangeL(event)} defaultValue={this.state.password} onKeyUp={() => this.keyUp(event)} />
                                <span className={this.psdComputed()} onClick={() => this.checkType()}></span>
                            </div>
                        </div>
                        <div className="login-footer">
                            <Button type="primary" onClick={() => this.onClickLogin()}>登录</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    componentDidMount() {
        // this.initLoginForm()
    }
    handelChangeU = (e) => {
		this.setState({
            userName: e.target.value
		},function() {
            console.log(this.state.userName);
        })
    }
    handelChangeL = (e) => {
		this.setState({
            password: e.target.value
		})
    }
    keyUp = (e) => {
        if (e.keyCode === 13) {
            this.onClickLogin()
        //    alert(`按了回车键，msg值为：${e.target.value}`)
        }
    }
    // 初始化登录表单
    initLoginForm = () => {
        this.setState({
            loginForm: {
                userName: '',
                password: ''
            }
        })
    }
    psdComputed = () => {
        return this.state.inputType === 'password' ? 'show-password open' : 'show-password close';
    }
    // 切换密码显示隐藏
    checkType = () => {
        if (this.state.inputType === 'text') {
            this.setState({
                inputType: 'password'
            })
        }else if (this.state.inputType === 'password') {
            this.setState({
                inputType: 'text'
            })
        }
    }
    onClickLogin = () => {
        if (!this.state.userName || !this.state.password) {
            message.error('请输入用户名和密码')
            return false
        }
        if (this.state.userName === 'admin' && this.state.password === 'admin') {
            message.success('登录成功')
            sessionStorage.setItem('login','yes')
            router.history.push('#/home')
            window.location.reload(true)
        } else {
            message.warning('用户名或者密码输入错误')
        }
    }
}

export default Login