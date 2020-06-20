import initialState from '../states/parts.state';
import { ADD_PART, REMOVE_PART } from '../constants/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_PART:
      const addPart = action.id;
      return {...state,
              [addPart]: {
                ...action.part,
                id: action.id
              }
             };
    default:
      return state;
  }
}