import {
  EDIT_CHUNK
} from '../constants/Page'

export function editChunk(id) {
  return {
    type: EDIT_CHUNK,
    id: id
  }
}