import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import Video from '../../components/video/Video';
import TransitionsVideo from '../../components/TransitionsVideo/TransitionsVideo';
import ResultVideo from '../../components/ResultVideo/ResultVideo';

import './styles.css';

const electron = window.require('electron');
const { ipcRenderer } = electron;

// setting up an event listener to read data that background process
// will send via the main process after processing the data we
// send from visiable renderer process
const messageFromBackgroundViaMain = (event, args) => {
	console.log(args);
}

const suscribeListeners = () => {

	ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', messageFromBackgroundViaMain);
}

const callBackgroundTask = () => {
	return (dispatch, state) => {
		ipcRenderer.send('START_BACKGROUND_VIA_MAIN', {
			state: JSON.stringify(state())
		});
		return Promise.resolve()
	}
}

const joinAndSave = (dispatch) => {
	dispatch(callBackgroundTask());
}

const Main = () => {
	const [progress, useProgress] = useState(0);
	useEffect(suscribeListeners, []);

	const { path } = useSelector(mapsStateToProps);
	const dispatch = useDispatch();
	return (
		<div className="container">
			<div className="row">
				<Video
					title={"Original Video"}
				/>
				<TransitionsVideo
				/>
			</div>

			<div className="column">
				{
					path &&
					(
						<div className="partsContainer">
							<ResultVideo />
						</div>
					)
				}
				<div className="row">
					{
						progress > 0 &&
						(
							<h2>Processing: 98%</h2>
						)
					}
					<Button
						variant="contained"
						color="primary"
						style={{ marginTop: 8 }}
						onClick={() => joinAndSave(dispatch)}
					>
						JOIN AND SAVE
    				</Button>
				</div>
			</div>
		</div>
	);
}

const mapsStateToProps = (store) => {
	const path = store.sourceVideo.path;
	return { path };
}

export default Main;