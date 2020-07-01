import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from 'react-player';
import { addSourceVideoPathAction } from '../../actions/source_video.actions';
import './styles.css';

const HEIGHT = 180;
const WIDTH = 320;

export default function Video ({ title }) {
	const { path } = useSelector(mapsStateToProps);
	const dispatch = useDispatch();
	return (
		<div className="containerVideo">
			<h2>{title}</h2>
			{
				path &&
				(
					<ReactPlayer
						url={path}
						height={HEIGHT}
						width={WIDTH}
						controls={true} />
				)
			}
			<input type="file" name="img" accept="video/*"
				onChange={e => {
					dispatch(
						addSourceVideoPathAction(URL.createObjectURL(e.target.files[0]),
												 e.target.files[0].path
												)
					);
				}} />
		</div>
	);
}
const mapsStateToProps = (store) => {
	const path = store.sourceVideo.path;
	return { path };
}
