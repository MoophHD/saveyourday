import {
    TOGGLE_STATE,
    CHANGE_TAG
} from '../constants/Control'


export function toggleState(date, id) {
    return {
        type: TOGGLE_STATE,
        payload: date,
        id: id
    }
}

export function changeTag(tag) {
    return {
        type: CHANGE_TAG,
        payload: tag
    }
}