// 这个是电影详情页
import React from 'react'

import { Layout, Card, Tag, Button, Icon } from 'antd'

const { Meta } = Card

import {
    LeftOutlined,
  } from '@ant-design/icons';

// 导入组件需要的样式表
import '@/assets/css/movieDetail.scss'

class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '这是电影详情页面',
            detailData: {},
        }
    }
    render() {
        const { detailData } = this.state
        console.log(detailData);
        return (
            <div className="movie-detail">
                <Layout className="detail-box">
                    <Button type="primary" onClick={()=>this.props.history.go(-1)}>
                        <LeftOutlined /> 返回列表页
                    </Button>
                    {/* <Button type="primary" onClick={() => this.onClickGoBack} icon={<LeftOutlined />}>
                        返回列表页
                    </Button> */}
                    <img src={detailData.images && detailData.images.large}></img>
                    {/* <Card
                        hoverable
                        style={{ width: 270 }}
                        cover={<img src={detailData.images && detailData.images.large}
                        onClick={() => this.onClickGoIntert(detailData.alt)}
                        />}
                    >
                        <Meta title={detailData.title} description={detailData.aka} />
                        <Tag color="darkseagreen">上映日期：{detailData.pubdate}</Tag>
                    </Card>, */}
                    <video autoPlay controls src={detailData.clip_urls && detailData.clip_urls[0]}></video>
                    <p style={{lineHeight: '30px', textIndent: '2em', fontSize: "20px", paddingTop: '1em'}}>{detailData.summary}</p>
                </Layout>
            </div>
        )
    }
    componentDidMount() {
        this.getMovieDetail()
    }
    // 获取电影详情
    getMovieDetail = async () => {
        const id = this.props.match.params.id
        const url = `/api/movie/subject/${id}?apikey=${this.apikey}`
        let res = await fetch(url)
        let data = await res.json()
        console.log(data);

        this.setState({
            detailData: data,
        },function() {
            // console.log(this.state.detailData);
        })
    }
    // 跳转列表页
    onClickGoBack = () => {
        this.props.history.go(-1)
    }
    // 跳转豆瓣详情
    onClickGoIntert = (url) => {
        window.location.href = url
    }
}

export default MovieDetail