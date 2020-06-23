import initialState from '../states/parts.state';
import { ADD_PART, REMOVE_PART } from '../constants/actions';

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PART:
      const addPart = action.id;
      return {
        ...state,
        [addPart]: {
          ...action.part,
          id: action.id
        }
      };
    case REMOVE_PART:
      return Object.keys(state)
        .filter(key => key !== action.id)
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    default:
      return state;
  }
}