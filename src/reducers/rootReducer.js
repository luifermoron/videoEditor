import { combineReducers } from 'redux';

import sourceVideo from './sourceVideo.reducer';
import parts from './parts.reducer';
import transitionsVideo from './transitionsVideo.reducer';
import resultVideo from './resultVideo.reducer';


const rootReducer = combineReducers({
    sourceVideo,
    parts,
    transitionsVideo,
    resultVideo

});

export default rootReducer;