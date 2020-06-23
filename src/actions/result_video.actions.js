import { UPDATE_RESULT_VIDEO_PATH } from '../constants/actions';
import { INCREMENT_INDEX } from '../constants/actions';
import { LABEL_INDEX_PARTS, LABEL_INDEX_TRANSITIONS } from '../constants/key';
import { ADD_RESULT_ID, REMOVE_RESULT_ID } from '../constants/actions';

export const addResultIdAction = (id) => {
    return {
        type: ADD_RESULT_ID,
        id: id
    }
}

export const removeResultIdAction = (id, resultPosition) => {
    return {
        type: REMOVE_RESULT_ID,
        id: id,
        resultPosition: resultPosition
    }
}

export const updateResultVideoPathAction = (path) => {
    return {
        type: UPDATE_RESULT_VIDEO_PATH,
        path: path
    }
}

export const incrementIndexParts = () => {
    return {
        type: INCREMENT_INDEX,
        label: LABEL_INDEX_PARTS
    }
}

export const incrementIndexTransitions = () => {
    return {
        type: INCREMENT_INDEX,
        label: LABEL_INDEX_TRANSITIONS
    }
}

