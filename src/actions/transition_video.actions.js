import { UPDATE_TRANSITION_VIDEO_PATH } from '../constants/actions';

export const updateTransitionVideoPathAction = (path) => {
    return {
        type: UPDATE_TRANSITION_VIDEO_PATH,
        path: path
    };
} 