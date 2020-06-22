import React, { useEffect, useState } from 'react';
import logo from '../../sources/logo.svg';
import Button from '@material-ui/core/Button';
import Video from '../../components/video/Video';
import Parts from '../../components/videoParts/Parts';

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

	return (
		<div className="container">
			<div className="row">
				<Video
					title={"Original Video"}
				/>
				<Video
					title={"Transition Video"}
				/>
			</div>

			<div className="column">
				<div className="partsContainer">
					<Parts/>
				</div>
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
						onClick={joinAndSave}
					>
						JOIN AND SAVE
    				</Button>
				</div>
			</div>
		</div>
	);
}

export default Main;