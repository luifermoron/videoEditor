import { UPDATE_RESULT_VIDEO_PATH } from '../constants/actions';

export const updateResultVideoPathAction = (path) => {
    return {
        type: UPDATE_RESULT_VIDEO_PATH,
        path: path
    }
}