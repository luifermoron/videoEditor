import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";

import './styles.css';

import { batch } from 'react-redux';

import { incrementIndexTransitions } from '../../actions/result_video.actions';

const timeStyle = {
  width: 100
};

const COLUMNS = [
  { title: "Transition Name", field: "id" },
  { title: "Path", field: "path" },
];

const deletePart = (dispatch, oldPart) => {
  const id = oldPart.id;
  batch(() => {

  });
}



export default function TransitionsVideo() {
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
              <input type="file" name="img" accept="video/*"
                onChange={e => {
                  console.log(URL.createObjectURL(e.target.files[0]));
                }} />
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
  const index = store.resultVideo.indexTransitions;
  return { parts, index };
}
