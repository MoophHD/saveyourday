import {
    EDIT_TAG,
    EDIT_SLICE,
    REMOVE_TAG
} from '../constants/ControlTable'

export function editTag(id, tag) {
    return {
        type: EDIT_TAG,
        id: id,
        payload: tag
    }
}


export function editSlice(id, date, isStart) {
    return {
        type: EDIT_SLICE,
        id: id,
        payload: date,
        isStart: isStart
    }
}

export function removeTag(id) {
    return {
        type: REMOVE_TAG,
        id: id
    }
}