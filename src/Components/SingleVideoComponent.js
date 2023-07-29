import React, { useContext } from "react";
import { MdWatchLater } from "react-icons/md";
import { Link } from "react-router-dom";
import { videoContext } from "../Context/videoContext";

const SingleVideoComponent = ({ video }) => {
	const { state, dispatch } = useContext(videoContext);

	return (
		<div className="min-w-[200px] w-[80vw] sm:w-[40vw] md:w-[25vw] relative shadow-md shadow-gray-300 p-1">
			<Link to={`/video/${video._id}`}>
				<img className="w-full" src={video.thumbnail} alt="text" />
			</Link>
			<div className="flex items-start gap-1 py-2">
				<img
					className="w-[20px] h-[20px] rounded-[50%]"
					src="https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
					alt=""
				/>
				<div>
					<p className="text-sm font-bold">{video.title}</p>
					<p className="text-sm font-semibold">{video.category}</p>
					<p className="text-sm">
						<span className="text-xs">{video.views} views</span> |{" "}
						<span className="text-xs">{video.creator}</span>
					</p>
				</div>
			</div>

			<div className="absolute top-0 right-0 bg-white p-1">
				<MdWatchLater
					size={20}
					className={`${video.watchLater && "text-blue-400"} cursor-pointer`}
					onClick={() =>
						dispatch({ type: "ADD TO WATCH LATER", payload: video._id })
					}
				/>
			</div>
		</div>
	);
};

export default SingleVideoComponent;
