import { ADD_SOURCE_VIDEO_PATH, RESET_INDEX, RESET_SOURCE_VIDEO } from '../constants/actions';

export const addSourceVideoPathAction = (path) => {
    return {
        type: ADD_SOURCE_VIDEO_PATH,
        path: path,
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