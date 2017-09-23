/* eslint-disable */
import {
  TOGGLE_STATE,
  CHANGE_TAG,
  APPEND_SLICE,
  TOGGLE_TWICE,
  RESET_STATE
} from '../constants/Control'

import {
  REMOVE_TAG,
  REMOVE_SLICE,
  EDIT_TAG,
  EDIT_SLICE
} from '../constants/ControlTable'
import formatDate from '../gist/formatDate'

let now = new Date();

const initialState = {
  currentTag: '',
  currentState: false,
  timeSlices: {
    lastDate: formatDate([now.getHours(), now.getMinutes(), now.getSeconds()]),
    byId: {},
    allIds: []
  },
  tagHistory: {
    byId: {},
    allIds: []
  },
  displayMode: 'LINE' // || GRAPH
}

let id,tagById,tagIds, sliceById, sliceIds, date, sliceState;

export default function control(state = initialState, action) {
  switch (action.type) {
    case EDIT_SLICE:
      sliceById = Object.assign({}, state.timeSlices.byId);
      sliceIds = state.timeSlices.allIds.slice();

      id = action.id;
      date = action.payload;
      sliceState = action.isStart ? 'start' : 'finish';  
      
      sliceById[sliceIds[id]][sliceState] = date;
      return {...state, timeSlices: {lastDate: state.timeSlices.lastDate, byId: sliceById, allIds: sliceIds}}
    case REMOVE_SLICE:
      return {...state}
    case EDIT_TAG:
      tagIds = state.tagHistory.allIds;
      tagById = state.tagHistory.byId;

      tagById[action.id] = action.payload;

      return {...state, tagHistory:{byId:tagById, allIds: tagIds}}
    case REMOVE_TAG:
      tagIds = state.tagHistory.allIds;
      tagById = state.tagHistory.byId;

      // delete tagById[deletedTagId];
      tagById[action.id] = 'None';
      
      
      return {...state, tagHistory:{byId:tagById, allIds: tagIds}}

    case RESET_STATE:
        let cookies = action.payload;
        return {...state, ...cookies, timeSlices: {lastDate:state.timeSlices.lastDate, byId:{...cookies.timeSlices.byId}, allIds:[...cookies.timeSlices.allIds]}}
    case TOGGLE_STATE:
        if (!state.currentState) {
          id = state.timeSlices.allIds.length > 0 ? parseInt(state.timeSlices.allIds[state.timeSlices.allIds.length - 1])+1: 0;
          return {...state,
            currentState: !state.currentState,
            tagHistory: {
              byId: {...state.tagHistory.byId, [id]:state.currentTag ? state.currentTag : 'None'},
              allIds: [...state.tagHistory.allIds, id]
            }
           }
        } else {
          return {...state, currentState: !state.currentState}
        }
    case CHANGE_TAG:
        return {...state, currentTag: action.payload }
    case APPEND_SLICE:
        id = state.timeSlices.allIds.length > 0 ? parseInt(state.timeSlices.allIds[state.timeSlices.allIds.length - 1])+1: 0;
        let slices = {...state.timeSlices.byId, [id]:{state: state.currentState, start:state.timeSlices.lastDate, finish:action.payload}}
        return {...state, timeSlices: {lastDate:action.payload, byId:slices, allIds:[...state.timeSlices.allIds, id]}}
    case TOGGLE_TWICE:
        id = state.timeSlices.allIds.length > 0 ? parseInt(state.timeSlices.allIds[state.timeSlices.allIds.length - 1])+1: 0;
        
        return {
          ...state,
            currentState: state.currentState,
            tagHistory: {
              byId: {...state.tagHistory.byId, [id+1]:state.currentTag},
              allIds: [...state.tagHistory.allIds, id+1]
            },
            timeSlices: {lastDate:action.date,
              allIds: [...state.timeSlices.allIds, id],
              byId: {
                ...state.timeSlices.byId,
                [id]: {state: false, start:state.timeSlices.lastDate, finish:action.date}
              }
            }   
        }
    default:
      return state
  }
}
