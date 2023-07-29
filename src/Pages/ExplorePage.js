import React, { useContext, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { videoContext } from "../Context/videoContext";
import SingleVideoComponent from "../Components/SingleVideoComponent";

const ExplorePage = () => {
	const [input, setInput] = useState("");
	const { state } = useContext(videoContext);
	const videoArr = state.videos.filter((video) =>
		video.title.toLowerCase().includes(input.toLowerCase())
	);
	return (
		<div className="flex flex-col items-center gap-3">
			<h1 className="text-3xl font-bold text-center p-2">Explore</h1>
			<div className="border py-1 px-2 flex items-center gap-2 w-[60%]">
				<BsSearch size={20} />
				<input
					type="search"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="focus: outline-none w-full px-3"
					placeholder="Search video by title..."
				/>
			</div>
			<main className="flex gap-3 flex-wrap justify-center">
				{videoArr.map((video) => (
					<SingleVideoComponent key={video._id} video={video} />
				))}
			</main>
		</div>
	);
};

export default ExplorePage;
