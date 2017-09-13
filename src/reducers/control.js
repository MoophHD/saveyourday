import {
  TOGGLE_STATE,
  CHANGE_TAG,
  APPEND_SLICE,
  TOGGLE_TWICE
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


export default function control(state = initialState, action) {
  let id;
  switch (action.type) {
    case TOGGLE_STATE:
        id = action.id != undefined ? action.id : state.chuncks.allIds.length; 
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
    case TOGGLE_TWICE:
        id = action.id != undefined ? action.id : state.chuncks.allIds.length;
        console.log(id);
        return {
                  ...state,
                   currentState: state.currentState,
                   chuncks: {allIds : [...state.chuncks.allIds, id, ++id],
                             byId: {...state.chuncks.byId, [id]: {date: action.date, tag: action.previousTag ? action.previousTag : 'None'},
                                                           [++id]: {date: action.date, tag: state.currentTag}                    
                            }
                          },
                  timeSlices: {lastDate:action.date,
                    slices: [...state.timeSlices.slices,   {state: false, start: action.date, finish: action.date}
                                                        ]}   
        }
    default:
      return state
  }
}
