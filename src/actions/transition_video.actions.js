import { ADD_TRANSITION, REMOVE_TRANSITION } from '../constants/actions';

export const addTransitionAction = (transition, id) => {
    return {
        type: ADD_TRANSITION,
        transition: transition,
        id: id,
    }
}

export const removeTransitionAction = (id) => {
    return {
        type: REMOVE_TRANSITION,
        id: id,
    }
}