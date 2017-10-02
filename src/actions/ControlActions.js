import {
    TOGGLE_STATE,
    CHANGE_TAG,
    APPEND_SLICE,
    TOGGLE_TWICE,
    RESET_STATE,
    TOGGLE_DISPLAY_MODE
} from '../constants/Control'


export function toggleState() {
    return {
        type: TOGGLE_STATE
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

export function toggleDisplayMode(type) {
    return {
        type: TOGGLE_DISPLAY_MODE,
        payload: type
    }
}