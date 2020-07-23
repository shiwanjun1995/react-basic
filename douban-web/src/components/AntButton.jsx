// 这个是 ant 的按钮组件
import React from "react"
import { Button } from 'antd'

class AntButton extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '这是大猪创建的一个ant的按钮组件'
        }
    }
    render() {
        return (
            <div>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <br />
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
            </div>
        )
    }
}

export default AntButton