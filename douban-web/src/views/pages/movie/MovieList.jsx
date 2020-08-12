// 这个是电影列表页
import React from 'React'

// 按需导入 ant 的UI组件
import { Card, Rate, Tag, Pagination, Layout, Spin, Avatar } from 'antd';

// 解构 ant UI组件
const { Meta } = Card;

// 导入组件需要的样式表
import '@/assets/css/movieList.scss'

class MovieList extends React.Component {
    constructor(props) {
        super()
        console.log(props);
        this.state = {
            movieType: props.match.params.movieType, // 电影类型
            moviePage: props.match.params.moviePage || 1, // 电影页数
            movieList: [], // 电影列表数据
            pageSize: 5,
            totalCount: 0,
            isLoading: false, // 默认不是在加载中
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <Spin className="movie-spin" size="large" />
            )
        }
        return (
            <div className="movie-container">
                <Layout className="table-box">
                    {
                        this.state.movieList.map(item => (
                            <Card
                                key={item.id}
                                style={{width:250}}
                                hoverable
                                cover={<img src={item.images.small}
                                onClick={() => this.onClickGoDetail(item.id)}
                                />}
                            >
                                <Meta title={item.title}></Meta>
                                <Tag color="cyan">上映年份：{item.year}</Tag>
                                <p>电影类型：{item.genres.join('、')}</p>
                                <Rate disabled defaultValue={item.rating.average/2}></Rate>
                            </Card>)
                        )

                    }
                </Layout>
                {/* 分页组件 */}
                <Pagination className="pagination-box"
                    // 当前页数
                    current={parseInt(this.state.moviePage)}
                    // 默认的当前页数
                    defaultCurrent={this.state.moviePage}
                    // 默认的每页条数
                    defaultPageSize={this.state.pageSize}
                    onChange={this.onChangePage}
                    total={this.state.totalCount}
                    // 用于显示数据总量和当前数据顺序
                    showTotal={(total) => `共 ${total} 条`}
                ></Pagination>
            </div>
        )
    }
    // 组件已经渲染完成
    componentDidMount() {
        this.getMovieList()
    }
    /**
     * 当切换路由的时候，会触发这个钩子函数
     * 因为这个组件是通过路由展示出来的，因此，这个钩子函数，在展示组件的时候，就会被执行一次
     * 每次切换菜单，都会执行 这个钩子函数
     */
    // 组件运行阶段 如果接收到的 props 发生了改变 就会触发该函数
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log('---',nextProps.match.params);
        this.setState({
            movieType: nextProps.match.params.movieType,
            moviePage: nextProps.match.params.moviePage,
            isLoading: true,
        }, function() {
            this.getMovieList()
        })
    }
    // 获取电影列表数据
    getMovieList = async () => {
        const start = (this.state.moviePage - 1) * this.state.pageSize
        const url = `/api/movie/${this.state.movieType}?apikey=${this.apikey}&start=${start}&count=5`
        let res = await fetch(url)
        let data = await res.json()
        console.log(data);

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //     })

        this.setState({
            movieList: data.subjects,
            totalCount: data.total,
            isLoading: false, // 数据已加载完成
        })
    }
    // 分页 页码改变的回调，参数是改变后的页码及每页条数
    onChangePage = (current, pageSize) => {
        const changeUrl = `/movieList/${this.state.movieType}/${current}`
        this.props.history.push(changeUrl)
    }
    // 跳转电影详情页面
    onClickGoDetail = (id) => {
        const detailUrl =  `/movieList/detail/${id}`
        this.props.history.push(detailUrl)
    }
}

export default MovieList