import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Button from '@material-ui/core/Button';
import './styles.css';

const HEIGHT = 180;
const WIDTH = 320;




const Video = ({ title }) => {
	return (
		<div className="containerVideo">
			<h2>{title}</h2>
			<ReactPlayer
				height={HEIGHT}
				width={WIDTH}
				url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
			<Button 
				variant="contained" 
				color="inherit"
				width={12}
				>
				Select
    		</Button>
		</div>
	);
}

export default Video;
