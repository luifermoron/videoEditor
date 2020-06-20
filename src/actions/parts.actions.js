import { ADD_PART, REMOVE_PART } from '../constants/actions';

export const addPartAction = (part, id) => {
    return {
        type: ADD_PART,
        part: part,
        id: id,
    }
}

export const removePartAction = (id) => {
    return {
        type: REMOVE_PART,
        id: id,
    }
}