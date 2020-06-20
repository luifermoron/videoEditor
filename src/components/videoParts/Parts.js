import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";

import './styles.css';

import { batch } from 'react-redux';

import { addPartAction, removePartAction } from '../../actions/parts.actions';
import { addPartIdAction, incrementIndex, removePartIdAction } from '../../actions/source_video.actions';

const timeStyle = {
  width: 100
};

const COLUMNS = [
  { title: "Parts", field: "id" },
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

const deletePart = (dispatch, oldPart) => {
  const id = oldPart.id;
  batch(() => {
    dispatch(removePartIdAction(id));
    dispatch(removePartAction(id));
  });
}

const addPart = (dispatch, index, times, resetTimes) => {
  const id = "p" + parseInt(index);

  batch(() => {
    dispatch(addPartAction(times, id));
    dispatch(addPartIdAction(id));
    dispatch(incrementIndex());
  });

  resetTimes();
}

export default function Parts() {
  const { times, updateTimeValue, resetTimes } = useTimes();

  const { parts, index } = useSelector(mapsStateToProps);

  const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        title="Parts of video"
        columns={COLUMNS}
        data={parts}
        options={{
          search: false
        }}
        actions={[
          {
            tooltip: 'Delete',
            icon: 'delete',
            onClick: (evt, part) => {
              deletePart(dispatch, part);
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
                onClick={() => addPart(dispatch, index, times, resetTimes)}
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
  const partKeys = store.sourceVideo.parts;
  const partsStoreArray = store.parts;

  let parts = [];
  for (let i = 0; i < partKeys.length; i++) {
    const partObject = partsStoreArray[partKeys[i]];
    if (partObject) parts = [...parts, { ...partObject, toString: partObject.init + " - " + partObject.end }];
  }
  const index = store.sourceVideo.index;
  return { parts, index };
}
