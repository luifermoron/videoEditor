import React, { useEffect, useState } from 'react';
import logo from '../../sources/logo.svg';

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

const Main = () => {
	useEffect(suscribeListeners, []);
	
	return (
		<div className="Main">
			<header className="Main-header">
				<img src={logo} className="Main-logo" alt="logo" />
				<p>
					Edit <code>src/modules/main/Main.js</code> and save to reload.
				</p>
				<a
					className="Main-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default Main;