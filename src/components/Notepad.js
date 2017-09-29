import React, { Component } from 'react'

class Notepad extends Component {
    constructor(props) {
        super(props);
        this.handleTabPress = this.handleTabPress.bind(this);
    }

    /* eslint-disable */
    componentDidMount() {
        this.area.value = this.props.cookiesValue;
        this.area.spellcheck = false;

        this.area.addEventListener('keydown', (e) => this.handleTabPress(e));
    }

    checkAndFixZeros(slice) {
        return slice.toString().length == 1 ? '0' + slice : slice;
    }

    parseDate(date) {
        date = date.split(date.match(/(\:|\-|\ |(\ \:\ ))/)[0]);
        
        date.forEach(function(el, ind) {
            if (/\d{1,2}\.\d{1,2}/.test(el)) {
                el = el.split('.');
                
                el[0] = this.checkAndFixZeros(el[0]);

                el[1] = (parseInt(el[1])*6).toString();
                
                el[1] = this.checkAndFixZeros(el[1]);

                el = el.join('-');

                date[ind] = el;
            }
        }, this);


        return date.join(' : ');
    }



    handleTabPress(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            
            let areaValue = this.area.value;
            let unformattedArr = areaValue.match(/(\d{1,4}|\d{1,2}\.\d{1,2})(\:|\ )(\d{1,2}\.\d{1,2}|\d{1,4})/g);

            if (unformattedArr) {
                unformattedArr.forEach(function(slice, ind) {
                    areaValue = areaValue.replace(slice, this.parseDate(slice));        
                }, this);
            }
            
            let formattedArr = areaValue.match(/\d{1,2}\-\d{1,2}(\ \:\ )\d{1,2}\-\d{1,2}/g);

            if (formattedArr) {
                let lastFormatted = formattedArr[formattedArr.length - 1];
                areaValue += '  ';
                areaValue += this.addMins(lastFormatted, 30);
            }


            this.area.value = areaValue;
        }
    }

    addMins(date, minValue) {
        let hrs = (minValue > 59) ? ~~(minValue/60) : 0;
        let mins = minValue % 60;

        let dateChuncks = date.split(' : ');
        let tempChunck;
        
        dateChuncks.forEach((el, ind) => {
            tempChunck = el.split('-');
            tempChunck[0] = parseInt(tempChunck[0]) + hrs;
            tempChunck[1] = parseInt(tempChunck[1]) + mins;
            if (tempChunck[0] > 12) {
                tempChunck[0] -= 12;
            }

            if (tempChunck[1] > 59) {
                tempChunck[0] += ~~(tempChunck[1]/60);

                tempChunck[1] = tempChunck[1] % 60;
            }
            console.log(tempChunck);
            tempChunck[0] = this.checkAndFixZeros(tempChunck[0]);
            tempChunck[1] = this.checkAndFixZeros(tempChunck[1]);
            console.log(tempChunck);

            dateChuncks[ind] = tempChunck.join('-');
        }, this)

        return dateChuncks.join(' : ');
    }
    
    render() {
        return (
            <div className="notepad">
                <textarea ref={(el) => this.area = el} className="notepadInput">

                </textarea>
            </div>
        )
    }
}

export default Notepad;