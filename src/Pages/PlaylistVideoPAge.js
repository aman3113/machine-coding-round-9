import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { videoContext } from "../Context/videoContext";
import SingleVideoComponent from "../Components/SingleVideoComponent";
import { RxCross2 } from "react-icons/rx";

const PlaylistVideoPAge = () => {
	const { playlistId } = useParams();
	const { state, dispatch } = useContext(videoContext);
	const selectedPlaylist = state.playList.find(
		(item) => item.id === Number(playlistId)
	);

	const playListItems = state.videos?.filter((video) =>
		selectedPlaylist.items.some((el) => el === video._id)
	);

	return (
		<div>
			<h1>{selectedPlaylist.title}</h1>
			<main className="flex gap-3 flex-wrap justify-center">
				{playListItems.map((video) => (
					<div className="relative" key={video._id}>
						<SingleVideoComponent video={video} />
						<div className="absolute top-0 left-0 bg-white p-1">
							<RxCross2
								className="cursor-pointer"
								onClick={() =>
									dispatch({
										type: "REMOVE VIDEO FROM PLAYLIST",
										payload: {
											playListId: selectedPlaylist.id,
											videoId: video._id,
										},
									})
								}
							/>
						</div>
					</div>
				))}
			</main>
		</div>
	);
};

export default PlaylistVideoPAge;
