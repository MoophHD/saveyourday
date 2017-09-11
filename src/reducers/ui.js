import {
  TOGGLE_STATE,
  CHANGE_TAG,
  APPEND_SLICE
} from '../constants/Control'
import formatDate from '../gist/formatDate'

let now = new Date();

const initialState = {
  currentTag: '',
  currentState: false,
  timeSlices: {
    lastDate: formatDate([now.getHours(), now.getMinutes(), now.getSeconds()]),
    slices: []
  },
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
        let id = action.id != undefined ? action.id : state.chuncks.allIds.length; 
        return {...state,
                 currentState: !state.currentState,
                 chuncks: {allIds : [...state.chuncks.allIds, id],
                           byId: {...state.chuncks.byId, [id]: {date: state.timeSlices.lastDate, tag: state.currentTag ? state.currentTag : 'None'}}}
                }
    case CHANGE_TAG:
        return {...state, currentTag: action.payload }
    case APPEND_SLICE:
        let slices = [...state.timeSlices.slices, {state: state.currentState, start:state.timeSlices.lastDate, finish:action.payload}];    
        return {...state, timeSlices: {lastDate:action.payload, slices:slices}}
    default:
      return state
  }
}
