import initialState from '../states/resultVideo.state';
import { INCREMENT_INDEX } from '../constants/actions';
import { ADD_RESULT_ID, REMOVE_RESULT_ID } from '../constants/actions';

export default function (state = initialState, action) {
  switch (action.type) {
    case INCREMENT_INDEX:
      const indexLabel = action.label;
      const oldIndex = state[indexLabel];
      return {
        ...state,
        [indexLabel]: oldIndex + 1
      };
    case ADD_RESULT_ID:
      const addPartId = action.id;
      return {
        ...state,
        result: [...state.result, addPartId]
      };
    case REMOVE_RESULT_ID:
      return {
        ...state,
        result: state.result.filter((part, _) => part.id !== action.id)
      };
    default:
      return state;
  }
}