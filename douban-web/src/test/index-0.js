console.log('🌈🌈🌈🌈🌈🌈','我是默认的打包入口文件');
// 处理css
import './style.css'
// 处理图片
import Icon1 from './test/icon1.jpg'
import Icon2 from './test/icon2.gif'

function component() {
    var ele = document.createElement('div')
    ele.innerHTML = 'Hello 你好大猪~'
    ele.classList.add('hello')

    // 将图像添加到我们现有的div
    // 处理icon图标
    var myIcon = new Image()
    myIcon.src = Icon1
    ele.appendChild(myIcon)

    var myIcon2 = new Image()
    myIcon2.src = Icon2
    ele.appendChild(myIcon2)

    return ele
}

document.body.appendChild(component())