import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                            {source}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://picsum.photos/id/200/220/150" : imageUrl}
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{`${title.length <= 40 ? title : `${title}...`}`}

                        </h5>
                        <p className="card-text">{`${description.length <= 80 ? description : `${description}.......`}`}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleTimeString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target='/blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
