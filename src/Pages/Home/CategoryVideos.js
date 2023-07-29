import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { videoContext } from "../../Context/videoContext";
import SingleVideoComponent from "../../Components/SingleVideoComponent";

const VideoListPage = () => {
	const { categoryName } = useParams();
	const { state } = useContext(videoContext);
	const categoryVideos = state.videos?.filter((video) => {
		return video.category === categoryName;
	});

	return (
		<div>
			<h1 className="text-center text-3xl font-bold p-3">{categoryName}</h1>
			<main className="flex gap-3 flex-wrap justify-center">
				{categoryVideos?.map((video) => (
					<SingleVideoComponent video={video} key={video._id} />
				))}
			</main>
		</div>
	);
};

export default VideoListPage;
