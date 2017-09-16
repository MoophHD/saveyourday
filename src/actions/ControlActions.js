import {
    TOGGLE_STATE,
    CHANGE_TAG,
    APPEND_SLICE,
    TOGGLE_TWICE,
    RESET_STATE
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

export function toggleTwice(id, date, tag) {
    return {
        type: TOGGLE_TWICE,
        id: id,
        previousTag: tag,
        date: date
    }
}

export function resetState(newState) {
    return {
        type: RESET_STATE,
        payload: newState
    }
}