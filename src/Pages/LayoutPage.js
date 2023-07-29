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

	return (
		<div className="flex h-screen w-screen flex-col-reverse sm:flex-row">
			<Sidebar />
			<div className="h-[90%] sm:h-full overflow-y-auto p-2 sm:p-2 w-full md:w-[75%] lg:w-[80%] shadow-md shadow-gray-300 rounded-md">
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutPage;
