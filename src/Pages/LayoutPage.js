import React, { useContext, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import { videoContext } from "../Context/videoContext";

const LayoutPage = () => {
	const { state } = useContext(videoContext);

	function handlePageUnload() {
		console.log("i run");
		localStorage.setItem("myVideoLibraryData", JSON.stringify(state));
	}

	useEffect(() => {
		window.addEventListener("beforeunload", handlePageUnload);
		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("beforeunload", handlePageUnload);
		};
	}, []);

	console.log(state);

	return (
		<div className="flex">
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default LayoutPage;
