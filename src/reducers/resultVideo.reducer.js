import initialState from '../states/resultVideo.state';
import { INCREMENT_INDEX } from '../constants/actions';
import { ADD_RESULT_ID, REMOVE_RESULT_ID } from '../constants/actions';
import { KEY_TRANSITIONS } from '../constants/key';


const findLastKeyTransitionPosition = (result) => {
  let position = -1;
  for (let i = 0; i < result.length; i++) {
    if (result[i].includes(KEY_TRANSITIONS))
      position = i;
  }
  return position;
}

const findPosition = (result) => {
  const lastTransitionPosition = findLastKeyTransitionPosition(result) + 1;
  if (lastTransitionPosition == 0) return 0;

  for (let i = lastTransitionPosition; i < result.length; i++) {
    if (!result[i].includes(KEY_TRANSITIONS))
      return i + 1;
  }
  return null;
}

function addInPosition(arr, start, deleteCount, ...items) {
  return [...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount)]
}

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
      if (addPartId.includes(KEY_TRANSITIONS)) {
        const position = findPosition(state.result);
        if (position !== null && position < state.result.length) {
          return {
            ...state,
            result: addInPosition(state.result, position, 0, addPartId)
          }
        }
      }
      return {
        ...state,
        result: [...state.result, addPartId]
      };
    case REMOVE_RESULT_ID:
      return {
        ...state,
        result: state.result.filter((result, position) => {
          const different = result.id !== action.id;
          return (action.resultPosition !== null) ? 
                 (position !== action.resultPosition && different) : 
                 (different);
        })
      };
    default:
      return state;
  }
}