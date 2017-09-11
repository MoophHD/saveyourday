import {
    TOGGLE_STATE,
    CHANGE_TAG,
    APPEND_SLICE
} from '../constants/Control'


export function toggleState(id) {
    return {
        type: TOGGLE_STATE,
        id: id
    }
}

export function appendSlice(date) {
    return {
        type: APPEND_SLICE,
        payload: date
    }
}

export function changeTag(tag) {
    return {
        type: CHANGE_TAG,
        payload: tag
    }
}