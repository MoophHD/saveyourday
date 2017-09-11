import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import * as actions from '../actions/UIActions'
import {TOGGLE_STATE} from '../constants/Control'
import formatDate from '../gist/formatDate'

/*eslint-disable */
let lastToggleTag = "";
const checkToggle = function({dispatch, getState}) {
  return function (next) {
    return function (action) {
      if (action.type == TOGGLE_STATE) {
        if (getState().ui.currentState && lastToggleTag != getState().ui.currentTag) {
          lastToggleTag = getState().ui.currentTag;

          let now = new Date();
          dispatch(actions.toggleState());
          dispatch(actions.appendSlice(formatDate([now.getHours(), now.getMinutes(), now.getSeconds()], ':')));
          console.log('after dispatch');
        }
        lastToggleTag = getState().ui.currentTag;
      }
      return next(action);
    };
  };
};
/*eslint-enable */
export default function configureStore(initialState) {
  const logger = createLogger()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, checkToggle))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
