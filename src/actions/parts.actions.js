import { ADD_PART, REMOVE_PART } from '../constants/actions';

export const addPartAction = (part) => {
    return {
        type: ADD_PART,
        part: part,
    }
}

export const removePartAction = (part) => {
    return {
        type: REMOVE_PART,
        part: part,
    }
}