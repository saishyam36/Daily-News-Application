import React, { Component } from 'react'
import NewsItem from './newsItem'
import Spinner from './spinner';
import { PropTypes } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News App`
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        this.updateNews()
        // console.log('entered', this.state.articles)
    }

    async updateNews() {
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log('entered', parsedData.totalResults)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     await this.updateNews()
    // }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     await this.updateNews()
    // }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log('entered', parsedData.articles.length,this.state.articles.length)
        this.setState({ articles: this.state.articles.concat(parsedData.articles), loading: false })
    };

    render() {
        return (
            <>
                <h1 className='text-center my-5' style={{ margin: '40px 0px', marginTop: '90px' }}>News Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    >
                    <div className='container my-3'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url} >
                                    <NewsItem title={element.title !== null ? element.title.slice(0, 40) : ""} description={element.description !== null ? element.description.slice(0, 40) : ""} imageUrl={element.urlToImage !== null ? element.urlToImage : ""} newsUrl={element.url} date={element.publishedAt} author={element.author != null ? element.author : "Unknown"} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
