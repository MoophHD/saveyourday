import {
  TOGGLE_STATE,
  CHANGE_TAG
} from '../constants/Control'
import formatDate from '../gist/formatDate'

let now = new Date();

const initialState = {
  currentTag: '',
  currentState: false,
  timeSlices: {
    lastDate: formatDate([now.getHours(), now.getMinutes(), now.getSeconds()]),
    slices: [{state: true, start: '1', finish: '1'}]},
  chuncks: {
    byId : {

    },
    allIds : []
  }, 
  displayMode: 'LINE' // || GRAPH
}


export default function ui(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STATE:
    let slices = [...state.timeSlices.slices, {state: state.currentState, start:state.timeSlices.lastDate, finish:action.payload}];
        return {...state,
                timeSlices: {lastDate: action.payload, slices: slices},
                 currentState: !state.currentState,
                 chuncks: {allIds : [...state.chuncks.allIds, action.id],
                           byId: {...state.chuncks.byId, [action.id]: {date: action.payload, tag: state.currentTag ? state.currentTag : 'None'}}}
                }
    case CHANGE_TAG:
        return {...state, currentTag: action.payload }
    default:
      return state
  }
}
