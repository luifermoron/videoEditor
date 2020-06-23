import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";

import './styles.css';

import { batch } from 'react-redux';

import { addPartAction, removePartAction } from '../../actions/parts.actions';
import { addResultIdAction, removeResultIdAction } from '../../actions/result_video.actions';

import { incrementIndexParts } from '../../actions/result_video.actions';
import { deleteTransition } from '../../components/TransitionsVideo/TransitionsVideo';

import { KEY_PARTS, KEY_TRANSITIONS } from '../../constants/key';
import { LABEL_INDEX_PARTS, LABEL_INDEX_TRANSITIONS } from '../../constants/key';

const timeStyle = {
  width: 100
};

const COLUMNS = [
  { title: "Parts/Transitions", field: "id" },
  { title: "Times", field: "toString" }
];

const useTimes = () => {
  const [times, setTimes] = useState({ init: "", end: "" });

  const updateTimeValue = (object) => {
    const key = object.target.id;
    setTimes({ ...times, [key]: object.target.value });
  }

  const resetTimes = () => {
    setTimes({ init: "", end: "" });
  }

  return { times, updateTimeValue, resetTimes };
}

const addPart = (dispatch, indexParts, times, resetTimes) => {
  const id = KEY_PARTS + parseInt(indexParts);
  batch(() => {
    dispatch(addPartAction({...times,
                            toString: times.init + " - " + times.end
                           }, 
                           id));
    dispatch(addResultIdAction(id));
    dispatch(incrementIndexParts());
  });

  resetTimes();
}

const deletePart = (dispatch, oldPart) => {
  const id = oldPart.id;
  batch(() => {
    dispatch(removeResultIdAction(id));
    dispatch(removePartAction(id));
  });
}

export default function ResultVideo() {
  const { times, updateTimeValue, resetTimes } = useTimes();

  const { result, indexParts } = useSelector(mapsStateToProps);

  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Result Video"
        columns={COLUMNS}
        data={result}
        options={{
          search: false
        }}
        actions={[
          {
            tooltip: 'Delete',
            icon: 'delete',
            onClick: (evt, resultObj) => {
              const id = resultObj.id;
              if (id.includes(KEY_PARTS)) {
                deletePart(dispatch, resultObj);
              } else if (id.includes(KEY_TRANSITIONS)) {
                deleteTransition(dispatch, resultObj, resultObj.tableData.id);
              }
            }
          }
        ]}
        components={{
          Toolbar: props => (
            <div className="containerAdd">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => addPart(dispatch, indexParts, times, resetTimes)}
              >
                Add
    		      </Button>
              <p>From: </p>
              <TextField
                id="init"
                label="hr:min:seg"
                variant="outlined"
                size="small"
                style={timeStyle}
                value={times.init}
                onChange={updateTimeValue}
              />
              <p>To: </p>
              <TextField
                id="end"
                label="hr:min:seg"
                variant="outlined"
                size="small"
                style={timeStyle}
                value={times.end}
                onChange={updateTimeValue}
              />
            </div>
          ),
        }}
      />
    </div>
  );
}


const mapsStateToProps = (store) => {
  const resultKeys = store.resultVideo.result;
  const resultStoreAll = { ...store.parts, ...store.transitionsVideo };

  let result = [];
  for (let i = 0; i < resultKeys.length; i++) {
    const objectResult = resultStoreAll[resultKeys[i]];
    if (objectResult) result = [...result, { ...objectResult, toString: objectResult.toString }];
  }

  const indexParts = store.resultVideo[LABEL_INDEX_PARTS];
  const indexTransitions = store.resultVideo[LABEL_INDEX_TRANSITIONS];
  return { result: result, 
           [LABEL_INDEX_PARTS]: indexParts, 
           [LABEL_INDEX_TRANSITIONS]: indexTransitions 
         };
}
