import React, { Component } from 'react'
import setSelectionRange from '../gist/setSelectionRange'

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
            
            let cursorPos = this.area.selectionStart;            
            let areaValue = this.area.value;
            let unformattedArr = areaValue.match(/(\d{1,4}|\d{1,2}\.\d{1,2})(\:|\ )(\d{1,2}\.\d{1,2}|\d{1,4})/g);
            let regFormatted = /\d{1,2}\-\d{1,2}(\ \:\ )\d{1,2}\-\d{1,2}/g;
            let formattedArr;
            let lastFormatted;
            let lastInd;

            if (unformattedArr) {
                unformattedArr.forEach(function(slice, ind) {
                    areaValue = areaValue.replace(slice, this.parseDate(slice));    
                }, this);
            }
            
            let formattedChuncks = areaValue.match(/\d{1,2}\-\d{1,2}(\ \:\ )\d{1,2}\-\d{1,2}/g);

            if (areaValue.search(regFormatted) != -1) {
                let prevResult = areaValue.match(regFormatted)[0];
                lastInd = areaValue.search(regFormatted) + prevResult.length;
                while (formattedArr = regFormatted.exec(areaValue)) {
                    if (regFormatted.lastIndex > cursorPos) { 
                        lastFormatted = prevResult;
                        
                        break;
                    }
                    prevResult =  formattedArr[0];
                    lastInd = formattedArr.index + prevResult.length;
                  }

                areaValue = areaValue.slice(0, lastInd) + '\n' + this.addMins(lastFormatted ? lastFormatted : formattedChuncks[formattedChuncks.length - 1], 30) + areaValue.slice(lastInd, areaValue.length) ;
            }
            console.log(lastFormatted);
            this.area.value = areaValue;
            if (lastFormatted == areaValue.match(regFormatted)[0]) {
                this.area.value += '\n'
                setSelectionRange(this.area, areaValue.length+1, areaValue.length+1);
            } else if (lastFormatted == undefined) {
                setSelectionRange(this.area, areaValue.length, areaValue.length);
            } else {
                this.area.value += '\n'
                setSelectionRange(this.area, lastInd, lastInd);
            }
        }
    }



    addMins(date, minValue) {
        let hrs = (minValue > 59) ? ~~(minValue/60) : 0;
        let mins = minValue % 60 ? minValue % 60 : 0;
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
            tempChunck[0] = this.checkAndFixZeros(tempChunck[0]);
            tempChunck[1] = this.checkAndFixZeros(tempChunck[1]);

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