import React, { Component } from 'react'

export default class Chunck extends Component {
    render() {
        const {id, date} = this.props;
        return(
            <div className="chunck" key={id}>
                {date.split(':').join(' : ')}
            </div>
        )
    }
}

