import React, { Component } from 'react' // eslint-disable-line
import PropTypes from 'prop-types' // eslint-disable-line

export default class Control extends Component {
    render() {
        const { state, tag, children } = this.props;
        return(
            <div className="control">
                <h1 style={{padding: '10px'}}>{state ? 'ACTIVE' : 'INACTIVE'}</h1>
                <h1 style={{padding: '10px'}}>{tag}</h1>
                {children}
            </div>
        )
    }
}


Control.propTypes = {
    state: PropTypes.bool.isRequired
}