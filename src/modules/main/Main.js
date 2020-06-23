import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
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

	// trigger event to start background process
	// can be triggered pretty much from anywhere after
	// you have set up a listener to get the information
	// back from background process, as I have done in line 13
	ipcRenderer.send('START_BACKGROUND_VIA_MAIN', {
		number: 25,
	});
}

const joinAndSave = () => {
	console.log("joinAndSave");
}

const Main = () => {
	const [progress, useProgress] = useState(0);
	useEffect(suscribeListeners, []);

	const { path } = useSelector(mapsStateToProps);

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
						onClick={joinAndSave}
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