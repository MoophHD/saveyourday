import React, { Component } from 'react'

class Notepad extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="notepad">
                <textarea className="notepadInput">

                </textarea>
            </div>
        )
    }
}

export default Notepad;