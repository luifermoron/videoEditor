import initialState from '../states/transitionsVideo.state';
import { ADD_TRANSITION, REMOVE_TRANSITION } from '../constants/actions';

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSITION:
      const addTransition = action.id;
      return {
        ...state,
        [addTransition]: {
          ...action.transition,
          id: action.id
        }
      };
    case REMOVE_TRANSITION:
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