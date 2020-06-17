import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from "material-table";

import './styles.css';

const timeStyle = {
  width: 100
};

const COLUMNS = [
  { title: "Parts", field: "part" },
  { title: "Times", field: "toString" }
];

const mapsStateToProps = (store) => {
  const partKeys = store.sourceVideo.parts;
  const partsStoreArray = store.parts;

  let parts = [];
  for (let i = 0; i < partKeys.length; i++) {
    const partObject = partsStoreArray[partKeys[i]];
    parts = [...parts, { ...partObject, toString: partObject.init + " - " + partObject.end }];
  }

  return { parts };
}

const addPart = (dispatch) => {
  console.log("addPart");

  console.log(dispatch);
}

const deletePart = (dispatch, oldPart) => {
  console.log("deletePart");
  console.log(oldPart);
  console.log(dispatch);
}

const useTimes = () => {
  const [times, setTimes] = useState({init: "" , end: ""});

  const updateTimeValue = (object) => {
    const key = object.target.id;
    setTimes({...times, [key]: object.target.value});
  }
  return { times, updateTimeValue };
}


export default function Parts() {
  const { times, updateTimeValue } = useTimes();

  const { parts } = useSelector(mapsStateToProps);
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
        editable={{
          onRowDelete: (oldPart) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                deletePart(dispatch, oldPart);
                /*setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });*/
              }, 600);
            }),
        }}
        components={{
          Toolbar: props => (
            <div className="containerAdd">
              <Button
                variant="contained"
                color="secondary"
                size="small"
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
