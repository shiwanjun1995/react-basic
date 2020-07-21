console.log('🌈🌈🌈🌈🌈🌈','我是默认的打包入口文件');
// 处理css
import './style.css'
// 处理图片
import Icon1 from './icon1.jpg'

function component() {
    var ele = document.createElement('div')
    ele.innerHTML = 'Hello 你好大猪~'
    ele.classList.add('hello')

    // 将图像添加到我们现有的div
    var myIcon = new Image()
    myIcon.src = Icon1
    ele.appendChild(myIcon)

    return ele
}

document.body.appendChild(component())