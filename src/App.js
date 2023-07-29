import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import LayoutPage from "./Pages/LayoutPage";
import ErrorPage from "./Pages/ErrorPage";
import CategoryPage from "./Pages/Home/CategoryPage";
import ExplorePage from "./Pages/ExplorePage";
import PlayListPage from "./Pages/PlayListPage";
import WatchLaterPage from "./Pages/WatchLaterPage";
import VideoListPage from "./Pages/Home/VideoListPage";
import SingleVideoPage from "./Pages/Home/SingleVideoPage";
import { ChakraProvider } from "@chakra-ui/react";
import VideoContextProvider from "./Context/videoContext";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path="/" element={<LayoutPage />}>
				<Route index={true} element={<CategoryPage />} />
				<Route path={`/category/:categoryName`} element={<VideoListPage />} />
				<Route
					path={`/category/:categoryName/video/:videoId`}
					element={<SingleVideoPage />}
				/>
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/playlist" element={<PlayListPage />} />
				<Route path="/watch-later" element={<WatchLaterPage />} />
			</Route>,
			<Route path="*" element={<ErrorPage />} />,
		])
	);
	return (
		<ChakraProvider>
			<VideoContextProvider>
				<RouterProvider router={router} />
			</VideoContextProvider>
		</ChakraProvider>
	);
}

export default App;
