/*eslint-disable */
import Cookies from 'js-cookie'
import * as controlActions from '../../actions/ControlActions'
import {
    TOGGLE_STATE,
    CHANGE_TAG,
    APPEND_SLICE,
    TOGGLE_TWICE,
    RESET_STATE
  } from '../../constants/Control'
import formatDate from '../../gist/formatDate'
let now = new Date();
if (!Cookies.get('state')) Cookies.set('state', {timeSlices: {slices:{}, lastDate: formatDate([now.getHours(), now.getMinutes(), now.getSeconds()])}, chuncks: {byId : {},allIds : []} });

const saveCookies = function({dispatch, getState}) {
    return function (next) {
      return function (action) {
        let cookies = JSON.parse(Cookies.get('state'));
        let state = getState().control;
        
        switch (action.type) {
            case TOGGLE_STATE:
                let id = state.chuncks.allIds.length ? state.chuncks.allIds[state.chuncks.allIds.length - 1] : 0;
                cookies = {...cookies,
                            chuncks: {
                              allIds: [...cookies.chuncks.allIds, id],
                              byId: {...cookies.chuncks.byId, [id]:{date: state.timeSlices.lastDate, tag: state.currentTag ? state.currentTag : 'None'}}
                            }
                          }
                break;
            case APPEND_SLICE:
                let slices = [...cookies.timeSlices.slices, {state: state.currentState, start:state.timeSlices.lastDate, finish:action.payload}];   
                console.log(state.timeSlices.lastDate);             
                cookies = {...cookies, timeSlices: {lastDate:action.payload, slices:slices}};
                break;  
        }

        Cookies.set('state', cookies);
        return next(action);
      };
    };
  };

export default saveCookies;