import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Button from '@material-ui/core/Button';
import './styles.css';

const HEIGHT = 180;
const WIDTH = 320;




const Video = ({ title }) => {
	const [videoFilePath, setVideoFileURL] = useState(null);

	return (
		<div className="containerVideo">
			<h2>{title}</h2>
			{
				videoFilePath &&
				(
					<ReactPlayer
						url={videoFilePath}
						height={HEIGHT}
						width={WIDTH}
						controls={true} />
				)
			}
			<input type="file" name="img" accept="video/*"
				onChange={e => {
					setVideoFileURL(URL.createObjectURL(e.target.files[0]));
				}} />
		</div>
	);
}

export default Video;
