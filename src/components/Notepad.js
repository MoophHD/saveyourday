import React, { Component } from 'react'

class Notepad extends Component {
    constructor(props) {
        super(props);
        this.handleTabPress = this.handleTabPress.bind(this);
    }

    componentDidMount() {
        this.area.value = this.props.cookiesValue;
        this.area.spellcheck = false;

        this.area.addEventListener('keydown', (e) => this.handleTabPress(e));
    }

    parseDate(date) {
        date = date.split(date.match(/[\:, \-, \ ]/)[0]);
        
        date.forEach(function(el, ind) {
            if (/\d{1,2}\.\d{1,2}/.test(el)) {
                el = el.split('.');
                
                if (el[0].length == 1) el[0] = '0' + el[0];

                el[1] = (parseInt(el[1])*6).toString();

                el = el.join('-');

                date[ind] = el;
            }
        });

        console.log()

        return date.join(' : ');
    }

    handleTabPress(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            
            let areaValue = this.area.value;
            let resultArr = areaValue.match(/(\d{1,4}|\d{1,2}\.\d{1,2})[\:, \-, \ ](\d{1,2}\.\d{1,2}|\d{1,4})/g);
            if (!resultArr) return;
            let result = resultArr[resultArr.length - 1];

            if (resultArr.length %2 == 1) this.area.value +='  ';

            this.area.value += this.parseDate(result);

        }
    }

    rebuildArea() {
        
    }
    

    render() {
        return (
            <div className="notepad">
                <textarea ref={(el) => this.area = el} onChange={::this.rebuildArea} className="notepadInput">

                </textarea>
            </div>
        )
    }
}

export default Notepad;