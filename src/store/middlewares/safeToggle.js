/*eslint-disable */
import * as controlActions from '../../actions/ControlActions'
import {TOGGLE_TWICE, TOGGLE_STATE} from '../../constants/Control'
import formatDate from '../../gist/formatDate'


let lastToggleTag = '';
 const checkToggle = function({dispatch, getState}) {
  return function (next) {
    return function (action) {
      if (action.type == TOGGLE_STATE) {
        if (getState().control.currentState && lastToggleTag != getState().control.currentTag) {
          let now = new Date();
          let ids = getState().control.chuncks.allIds;
          let id = ids[ids.length-1];
          let tmpTag =  lastToggleTag;
          lastToggleTag = getState().control.currentTag;
          return next (controlActions.toggleTwice(id, formatDate([now.getHours(), now.getMinutes(), now.getSeconds()], ':'), lastToggleTag));          
        }
        lastToggleTag = getState().control.currentTag;
      }
      return next(action);
    };
  };
};
/*eslint-enable */


export default checkToggle;