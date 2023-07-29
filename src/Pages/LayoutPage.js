import React, { useContext, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
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
