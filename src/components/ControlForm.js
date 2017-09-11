import React, {Component} from 'react'
import PropTypes from 'prop-types' 
import formatDate from '../gist/formatDate'

export default class ControlForm extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.state = {
            value: ''
        }
    }
    handleStart() {
       this.props.onStart(); 
    }

    handleFinish() {
        this.props.onFinish();
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubmit(e) {
        let now = new Date();
        e.preventDefault();
        // if (this.props.state && this.state.value != this.lastTag)
            // this.props.onToggle(formatDate([now.getHours(), now.getMinutes(), now.getSeconds()], ':'), ++this.id);

        if (this.props.tag != this.state.value) this.props.onTagChange(this.state.value);
        this.props.onSliceAdd(formatDate([now.getHours(), now.getMinutes(), now.getSeconds()], ':'));
        this.props.onToggle(++this.id);




        this.lastTag = this.state.value;
    }

    render() {
        return (
            <div className="tagPanel">
                <form onSubmit={::this.handleSubmit}>
                    <input autoFocus={true}
                           type="text" 
                           value={this.state.value}
                           onChange={::this.handleChange}
                    />
                </form>
            </div>  
        )
    }
}

ControlForm.propTypes = {
    state: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
}