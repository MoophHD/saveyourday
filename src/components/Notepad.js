/* eslint-disable */

import React, { Component } from 'react'
import setSelectionRange from '../gist/setSelectionRange'

class Notepad extends Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.area.value = this.props.cookiesValue;
        this.area.spellcheck = false;
        this.localRegFormatted = /\d{1,2}\-\d{1,2}(\ \:\ )\d{1,2}\-\d{1,2}/;
        this.regFormatted = /\d{1,2}\-\d{1,2}(\ \:\ )\d{1,2}\-\d{1,2}/g;
        this.chunckReg = /\d{1,2}\-\d{1,2}/;
``
        this.area.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    checkAndFixZeros(slice) {
        return slice < 10 ? '0' + slice : slice.toString();
    }

    parseDate(date) {
        date = date.split(date.match(/(\:|\-|\ |(\ \:\ ))/)[0]);
        
        date.forEach(function(el, ind) {
            if (/\d{1,2}\.\d{1,2}/.test(el)) {
                el = el.split('.');
                el[0] = this.checkAndFixZeros(el[0]);
                
                if (el[1].length == 1) el[1] = (parseInt(el[1])*6).toString();
                
                el[1] = this.checkAndFixZeros(el[1]);
                
                el = el.join('-');

                date[ind] = el;
            }
        }, this);


        return date.join(' : ');
    }

    handleKeyPress(e) {
        if (e.keyCode == 9) {
            e.preventDefault();
            
            let cursorPos = this.area.selectionStart;            
            let areaValue = this.area.value;
            let unformattedArr = areaValue.match(/(\d{1,4}|\d{1,2}\.\d{1,2})(\:|\ )(\d{1,2}\.\d{1,2}|\d{1,4})/g);
            let regFormatted = this.regFormatted;
            let formattedArr,
                lastFormatted,
                lastInd,
                lastDate,
                realInd;

            if (unformattedArr) {
                unformattedArr.forEach(function(slice, ind) {
                    areaValue = areaValue.replace(slice, this.parseDate(slice));    
                }, this);
            } 
            
            let formattedChuncks = areaValue.match(/\d{1,2}\-\d{1,2}(\ \:\ )\d{1,2}\-\d{1,2}/g);

            if (!unformattedArr && !formattedChuncks) return;

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
                lastDate = lastFormatted ? lastFormatted : formattedChuncks[formattedChuncks.length - 1];

                let prevToLineEnd = new RegExp(prevResult + ".*$", "gm");
                realInd = lastInd + prevToLineEnd.exec(areaValue)[0].length + 1;
                let skipLine = '\n';
                console.log(areaValue[areaValue.length-1])

                if (areaValue[areaValue.length-1] == '\n') skipLine ='';

                console.log(skipLine);
                areaValue = areaValue.slice(0, realInd) + skipLine + this.addMins( lastDate, 30, true) + areaValue.slice(realInd, areaValue.length) ;
            }
            this.area.value = areaValue;
            setSelectionRange(this.area, realInd+lastDate.length, realInd+lastDate.length);

        } else if (e.ctrlKey && ( e.key == "ArrowDown" || e.key == "ArrowUp" )) {
            e.preventDefault()
            let selection = window.getSelection().toString();
            let area = this.area.value
            let selInd = area.indexOf(selection);
            let mod = e.key == "ArrowUp" ? 1 : -1;
            
            if (this.regFormatted.test(selection)) {
                let dates = selection.match(this.regFormatted);
                
                dates.forEach((date) => {
                    selection = selection.replace(date, this.addMins(date, 15*mod, false) ); 
                }, this)

                this.area.value = area.slice(0, selInd) + selection + area.slice(selInd + selection.length);

                setSelectionRange(this.area, selInd, selInd + selection.length);
                
            } else if (this.chunckReg.test(selection)) {
                let chunck = selection.match(this.chunckReg)[0];
                selection = selection.replace(chunck, this.addMinsToChunck(chunck, 15*mod));

                this.area.value = area.slice(0, selInd) + selection + area.slice(selInd + selection.length, area.length);

                setSelectionRange(this.area, selInd, selInd + selection.length);
            }
        }
    }

    addMinsToChunck(chunk, minValue) {
        let hrs = (minValue > 59) ? ~~(minValue/60) : 0;
        let mins = minValue % 60 ? minValue % 60 : 0;
        let tempChunck = chunk.split('-');

        tempChunck[0] = parseInt(tempChunck[0]) + hrs;
        tempChunck[1] = parseInt(tempChunck[1]) + mins;

        if (tempChunck[1] < 0 ) {
            tempChunck[0] -= ~~(tempChunck[1]/60) + 1;
            tempChunck[1] += 60;
        } else if (tempChunck[1] > 59) {
            tempChunck[0] += ~~(tempChunck[1]/60);
            tempChunck[1] -= 60;
        }

        if (tempChunck[0] < 0 ) {
            tempChunck[0] += 12;
        } else if (tempChunck[0] > 11) {
            tempChunck[0] -= 12;
        }

        tempChunck[0] = this.checkAndFixZeros(tempChunck[0]);
        tempChunck[1] = this.checkAndFixZeros(tempChunck[1]);

        return tempChunck.join('-');
    }

    addMins(date, minValue, toLast=true) {
        let hrs = (minValue > 59) ? ~~(minValue/60) : 0;
        let mins = minValue % 60 ? minValue % 60 : 0;
        let dateChuncks = date.split(' : ');
        let tempChunck;

        
        switch (toLast) {
            case true:
                    dateChuncks[0] = dateChuncks[1];
            
                    tempChunck = dateChuncks[1].split('-');
            
                    tempChunck[0] = parseInt(tempChunck[0]) + hrs;
                    tempChunck[1] = parseInt(tempChunck[1]) + mins;
            
                    if (tempChunck[0] > 11) {
                        tempChunck[0] -= 12;
                    }
            
                    if (tempChunck[1] > 59) {
                        tempChunck[0] += ~~(tempChunck[1]/60);
            
                        tempChunck[1] = tempChunck[1] % 60;
                    }
                    tempChunck[0] = this.checkAndFixZeros(tempChunck[0]);
                    tempChunck[1] = this.checkAndFixZeros(tempChunck[1]);
            
                    dateChuncks[1] = tempChunck.join('-');
                    return dateChuncks.join(' : ');
                    
            case false:
                    dateChuncks.forEach((chunck,ind ) => {
                        tempChunck = chunck.split('-');

                        tempChunck[0] = parseInt(tempChunck[0]) + hrs;
                        tempChunck[1] = parseInt(tempChunck[1]) + mins;


                        if (tempChunck[1] < 0 ) {
                            tempChunck[0] -= ~~(tempChunck[1]/60) + 1;
                            tempChunck[1] += 60;
                        } else if (tempChunck[1] > 59) {
                            tempChunck[0] += ~~(tempChunck[1]/60);
                            tempChunck[1] -= 60;
                        }

                        if (tempChunck[0] < 0 ) {
                            tempChunck[0] += 12;
                        } else if (tempChunck[0] > 11) {
                            tempChunck[0] -= 12;
                        }

                        tempChunck[0] = this.checkAndFixZeros(tempChunck[0]);
                        tempChunck[1] = this.checkAndFixZeros(tempChunck[1]);

                        dateChuncks[ind] = tempChunck.join('-');

                    })
                    return dateChuncks.join(' : ');
                }


            
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