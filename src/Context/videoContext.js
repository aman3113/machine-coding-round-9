import { createContext, useEffect, useReducer } from "react";
import { playList, videos } from "../Utils/Data";

export const videoContext = createContext();

const storageData = JSON.parse(localStorage.getItem("myVideoLibraryData"));

const initialState = {
	videos: storageData ? storageData.videos : videos,
	playList: storageData ? storageData.playList : playList,
};

function reducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case "ADD FROM LOCAL STORAGE":
			return {
				payload,
			};

		case "ADD TO WATCH LATER":
			return {
				...state,
				videos: state.videos.map((video) =>
					video._id === payload
						? { ...video, watchLater: !video.watchLater }
						: video
				),
			};

		case "ADD PLAYLIST":
			return {
				...state,
				playList: [
					...state.playList,
					{ id: state.playList.length + 1, ...payload, items: [] },
				],
			};

		case "REMOVE PLAYLIST":
			return {
				...state,
				playList: state.playList.filter((item) => item.id !== payload),
			};

		case "ADD VIDEO TO PLAYLIST":
			return {
				...state,
				playList: state.playList.map((el) => {
					if (payload.playListId === el.id) {
						return {
							...el,
							items: [...el.items, payload.videoId],
						};
					} else {
						return el;
					}
				}),
			};

		case "REMOVE VIDEO FROM PLAYLIST":
			return {
				...state,
				playList: state.playList.map((el) => {
					if (payload.playListId === el.id) {
						return {
							...el,
							items: el.items.filter((item) => item !== payload.videoId),
						};
					} else {
						return el;
					}
				}),
			};

		case "ADD NOTE":
			return {
				...state,
				videos: state.videos?.map((video) =>
					video._id === payload.videoId
						? { ...video, notes: [...video.notes, payload.note] }
						: video
				),
			};

		default:
			return state;
	}
}

export default function VideoContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	function handlePageUnload() {
		localStorage.setItem("myVideoLibraryData", JSON.stringify(state));
	}
	useEffect(() => {
		handlePageUnload();
	}, [state]);

	return (
		<videoContext.Provider value={{ state, dispatch }}>
			{children}
		</videoContext.Provider>
	);
}
