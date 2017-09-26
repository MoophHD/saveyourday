import React, { Component } from 'react'

class Notepad extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let input = document.querySelector('.notepadInput');
        input.value = this.props.cookiesValue;
        input.spellcheck = false;
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