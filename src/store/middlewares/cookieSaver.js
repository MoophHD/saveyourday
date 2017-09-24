/*eslint-disable */
import Cookies from 'js-cookie'
import {
    TOGGLE_STATE,
    CHANGE_TAG,
    APPEND_SLICE,
    TOGGLE_TWICE,
    RESET_STATE
  } from '../../constants/Control'
import formatDate from '../../gist/formatDate'

const saveCookies = function({dispatch, getState}) {
  if (!Cookies.get('state')) {
    Cookies.set('state', getState().control);
  } 
    return function (next) {
      return function (action) {
        let state = getState().control;
        let cookies = JSON.parse(Cookies.get('state'));    
    
        cookies = {...cookies, ...state};
        console.log(state);
        Cookies.set('state', cookies);
        return next(action);
      };
    };
  };

export default saveCookies;