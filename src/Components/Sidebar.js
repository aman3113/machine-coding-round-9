import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<section className=" flex items-center justify-around p-2 sm:flex-col sm:justify-start sm:items-start sm:gap-4 md:w-[25%] lg:w-[20%] pl-[30px] sm:pt-[80px] shadow-md shadow-gray-400 rounded-md ">
			<NavLink
				to="/"
				className={({ isActive }) =>
					`${isActive && "text-red-500"} flex gap-2 items-center `
				}
			>
				<AiFillHome size={25} />
				<span className="hidden md:block text-lg">Home</span>
			</NavLink>
			<NavLink
				to="/explore"
				className={({ isActive }) =>
					`${isActive && "text-red-500"} flex gap-2 items-center `
				}
			>
				<FaCompass size={25} />
				<span className="hidden md:block text-lg">Explore</span>
			</NavLink>
			<NavLink
				to="/playlist"
				className={({ isActive }) =>
					`${isActive && "text-red-500"} flex gap-2 items-center `
				}
			>
				<MdPlaylistAdd size={25} />
				<span className="hidden md:block text-lg">Playlists</span>
			</NavLink>
			<NavLink
				to="/watch-later"
				className={({ isActive }) =>
					`${isActive && "text-red-500"} flex gap-2 items-center `
				}
			>
				<MdWatchLater size={25} />
				<span className="hidden md:block text-lg">Watch Later</span>
			</NavLink>
		</section>
	);
};

export default Sidebar;
