import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";

import './styles.css';

import { batch } from 'react-redux';

import { addResultIdAction, incrementIndexTransitions, removeResultIdAction } from '../../actions/result_video.actions';
import { addTransitionAction, removeTransitionAction } from '../../actions/transition_video.actions';

import { KEY_TRANSITIONS, LABEL_INDEX_TRANSITIONS } from '../../constants/key';

const timeStyle = {
  width: 100
};

const COLUMNS = [
  { title: "Transition Name", field: "id" },
  { title: "Path", field: "toString" },
];

const addTransition = (dispatch, path, indexTransitions) => {
  const id = KEY_TRANSITIONS + parseInt(indexTransitions);
  batch(() => {
    dispatch(addTransitionAction({
      path: path,
      toString: "video length"
    },
      id));
    dispatch(incrementIndexTransitions());
  });
}

export const deleteTransition = (dispatch, transition, resultPosition = undefined) => {
  const id = transition.id;
  batch(() => {
    dispatch(removeResultIdAction(id, resultPosition));
    if (!resultPosition)
      dispatch(removeTransitionAction(id));
  });
}

export default function TransitionsVideo() {
  const { transitionsVideo, indexTransitions } = useSelector(mapsStateToProps);

  const dispatch = useDispatch();
  return (
    <div style={{ width: "50%", alignSelf: 'flex-start', marginTop: 16 }}>
      <h2>{"Transitions Video"}</h2>
      <MaterialTable
        title="Parts of video"
        columns={COLUMNS}
        data={transitionsVideo}
        options={{
          search: false,
          paging: false
        }}
        actions={[
          {
            tooltip: 'Add',
            icon: 'add',
            onClick: (evt, transition) => {
              dispatch(addResultIdAction(transition.id));
            }
          },
          {
            tooltip: 'Delete',
            icon: 'delete',
            onClick: (evt, transition) => {
              deleteTransition(dispatch, transition);
            }
          }
        ]}
        components={{
          Toolbar: props => (
            <div className="containerAddTransitions">
              <input type="file" name="img" accept="video/*"
                onChange={e => {
                  addTransition(dispatch,
                    URL.createObjectURL(e.target.files[0]),
                    indexTransitions
                  );
                }} />
            </div>
          ),
        }}
      />
    </div>
  );
}


const mapsStateToProps = (store) => {
  const transitionsKey = Object.keys(store.transitionsVideo);
  const transitionsObject = store.transitionsVideo;

  let transitionsVideo = [];
  for (let i = 0; i < transitionsKey.length; i++) {
    const key = transitionsKey[i];
    if (transitionsObject[key]) transitionsVideo = [...transitionsVideo, { ...transitionsObject[key] }];
  }

  const index = store.resultVideo[LABEL_INDEX_TRANSITIONS];
  return { transitionsVideo, [LABEL_INDEX_TRANSITIONS]: index };
}
