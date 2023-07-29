import { createContext, useReducer } from "react";
import { videos } from "../Utils/Data";

export const videoContext = createContext();

const storageData = JSON.parse(localStorage.getItem("myVideoLibraryData"));

const initialState = {
	videos: storageData ? storageData.videos : videos,
	playList: storageData ? storageData.playList : [],
	watchList: storageData ? storageData.watchList : [],
};

function reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case "ADD VIDEOS":
			return {
				...state,
				videos: [...payload],
			};

		default:
			return state;
	}
}

export default function VideoContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<videoContext.Provider value={{ state, dispatch }}>
			{children}
		</videoContext.Provider>
	);
}
