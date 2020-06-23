import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";

import './styles.css';

import { batch } from 'react-redux';

import { addPartAction, removePartAction } from '../../actions/parts.actions';
import { addPartIdAction, incrementIndex, removePartIdAction } from '../../actions/source_video.actions';

import { KEY_PARTS } from '../../constants/key';

const timeStyle = {
  width: 100
};

const COLUMNS = [
  { title: "Transition Name", field: "id" },
  { title: "Path", field: "path" },
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
  const id = KEY_PARTS + parseInt(index);

  batch(() => {
    dispatch(addPartAction(times, id));
    dispatch(addPartIdAction(id));
    dispatch(incrementIndex());
  });

  resetTimes();
}

export default function TransitionsVideo() {
  const { times, updateTimeValue, resetTimes } = useTimes();

  const { transitionsVideo, index } = useSelector(mapsStateToProps);

  const dispatch = useDispatch();

  return (
    <div style={{ width: "40%", alignSelf: 'flex-start', marginTop: 16 }}>
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
            tooltip: 'Delete',
            icon: 'delete',
            onClick: (evt, part) => {
              deletePart(dispatch, part);
            }
          }
        ]}
        components={{
          Toolbar: props => (
            <div className="containerAddTransitions">
              <Button
                variant="contained"
                color="default"
                size="small"
                onClick={() => addPart(dispatch, index, times, resetTimes)}
              >
                Add
    		      </Button>
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
