import initialState from '../states/sourceVideo.state';
import { INCREMENT_INDEX, ADD_PART_ID } from '../constants/actions';

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PART_ID:
      const addPartId = action.id;
      return {
        ...state,
        parts: [...state.parts, addPartId]
      };
    case INCREMENT_INDEX:
      const oldIndex = state.index;
      return {
        ...state,
        index: oldIndex + 1
      };
    default:
      return state;
  }
}