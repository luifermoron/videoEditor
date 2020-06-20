import { ADD_SOURCE_VIDEO_PATH, ADD_PART_ID, REMOVE_PART_ID, INCREMENT_INDEX, RESET_INDEX, RESET_SOURCE_VIDEO } from '../constants/actions';

export const addSourceVideoPathAction = (path) => {
    return {
        type: ADD_SOURCE_VIDEO_PATH,
        path: path,
    }
}

export const addPartIdAction = (id) => {
    return {
        type: ADD_PART_ID,
        id: id
    }
}

export const removePartIdAction = (id) => {
    return {
        type: REMOVE_PART_ID,
        id: id
    }
}

export const incrementIndex = () => {
    return {
        type: INCREMENT_INDEX
    }
}

export const resetIndexAction = () => {
    return {
        type: RESET_INDEX,
    }
}

export const resetSourceVideoAction = () => {
    return {
        type: RESET_SOURCE_VIDEO,
    }
}