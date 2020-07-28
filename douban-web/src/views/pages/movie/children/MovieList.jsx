// 这个是电影列表页
import React from 'React'

// 按需导入 ant 的UI组件
import { Card } from 'antd';

class MovieList extends React.Component {
    constructor(props) {
        super()
        console.log(props);
        this.state = {
            movieType: '', // 电影类型
            movieList: ['1','2','3'], // 电影列表数据
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.movieList.map(item => <Card key={item}>
                        { item }
                    </Card>)

                }
                <h1>电影列表页</h1>
            </div>
        )
    }
    // 组件将要挂载
    componentWillMount() {
        // 获取电影列表数据
    }
    /**
     * 当切换路由的时候，会触发这个钩子函数
     * 因为这个组件是通过路由展示出来的，因此，这个钩子函数，在展示组件的时候，就会被执行一次
     * 每次切换菜单，都会执行 这个钩子函数
     */
    // 组件运行阶段 如果接收到的 props 发生了改变 就会触发该函数
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            movieType: nextProps.match.params.movieType
        })
        this.getMovieList()
    }
    // http://localhost:3000/api/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6
    getMovieList = async() => {
        // console.log(this.state.movieType);
        // const url = `/api/movie/${this.state.movieType}?apikey=${this.apikey}&start=0$count=6`

        // let res = await this.$http(url)
        // const data = await res.json()
        // console.log(data)

        const res =  await this.$http(this.baseURL + '/v2/movie/' + this.state.movieType + '?apikey=' + this.apikey + '&start=0'+ '&count=6')
        const data = await res.json()
        console.log(data)
        // this.setState({
        //     movieList: 
        // })
    }
}

export default MovieList