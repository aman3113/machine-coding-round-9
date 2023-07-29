import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";

const Sidebar = () => {
	return (
		<section>
			<div className="flex gap-2 items-center">
				<AiFillHome size={20} />
				<span>Home</span>
			</div>
			<div className="flex gap-2 items-center">
				<FaCompass size={20} />
				<span>Explore</span>
			</div>
			<div className="flex gap-2 items-center">
				<MdPlaylistAdd size={20} />
				<span>Playlists</span>
			</div>
			<div className="flex gap-2 items-center">
				<MdWatchLater size={20} />
				<span>Watch Later</span>
			</div>
		</section>
	);
};

export default Sidebar;
