import React, { useContext } from "react";
import { videoContext } from "../Context/videoContext";
import SingleVideoComponent from "../Components/SingleVideoComponent";

const WatchLaterPage = () => {
	const { state } = useContext(videoContext);

	const watchLaterVideos = state.videos.filter((video) => video.watchLater);
	return (
		<div>
			<h1 className="text-center text-3xl font-bold p-2">Watch Later</h1>
			{watchLaterVideos.length === 0 ? (
				<p className="text-xl font-semibold text-center pt-[100px]">
					No videos to watch later.
				</p>
			) : (
				<main className="flex gap-3 flex-wrap justify-center">
					{watchLaterVideos?.map((video) => (
						<SingleVideoComponent video={video} key={video._id} />
					))}
				</main>
			)}
		</div>
	);
};

export default WatchLaterPage;
