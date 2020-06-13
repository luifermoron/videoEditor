import { combineReducers } from 'redux';

import sourceVideo from './sourceVideo.reducer';
import parts from './parts.reducer';
import transitionVideo from './transitionVideo.reducer';
import resultVideo from './resultVideo.reducer';


const rootReducer = combineReducers({
    sourceVideo,
    parts,
    transitionVideo,
    resultVideo

});

export default rootReducer;