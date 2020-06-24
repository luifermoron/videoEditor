import initialState from '../states/sourceVideo.state';

import { ADD_SOURCE_VIDEO_PATH } from '../constants/actions';

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SOURCE_VIDEO_PATH:
      return {
        ...state,
        path: action.path,
        videoInformation: action.videoInformation
      };
    default:
      return state;
  }
}