import React, { useContext, useState } from "react";
import { videoContext } from "../Context/videoContext";
import { Link } from "react-router-dom";

import { RxCross2 } from "react-icons/rx";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

const PlayListPage = () => {
	const { state, dispatch } = useContext(videoContext);
	const [openPlayListModal, setOpenPlayListModal] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		thumbnail: "",
	});
	function handleFormChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		dispatch({ type: "ADD PLAYLIST", payload: formData });
		setFormData({
			title: "",
			description: "",
			thumbnail: "",
		});
		setOpenPlayListModal(false);
	}
	return (
		<div>
			<h1 className="text-3xl font-bold p-2 text-center">Playlists</h1>
			<button
				onClick={() => setOpenPlayListModal(true)}
				className="border bg-red-500 text-white px-3 py-1 rounded-md"
			>
				Create New Playlist
			</button>
			{state.playList.length === 0 ? (
				<p className="text-xl font-semibold text-center pt-[100px]">
					Let's Create your First Playlist.
				</p>
			) : (
				<main className="flex gap-3 flex-wrap justify-center">
					{state.playList.map((category) => (
						<div className="relative min-w-[200px] w-[20vw]" key={category.id}>
							<Link
								to={`/playlist/${category.id}`}
								className="  shadow-md shadow-gray-500"
							>
								<img
									className="w-full"
									src={
										category.thumbnail
											? category.thumbnail
											: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
									}
									alt="text"
								/>
								<p className="text-base font-semibold">{category?.title}</p>
								<p>{category?.description}</p>
							</Link>
							<div className="absolute top-0 right-0 bg-white p-1">
								<RxCross2
									className="cursor-pointer"
									onClick={() =>
										dispatch({ type: "REMOVE PLAYLIST", payload: category.id })
									}
								/>
							</div>
						</div>
					))}
				</main>
			)}

			<Modal
				isOpen={openPlayListModal}
				onClose={() => setOpenPlayListModal(false)}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add a Playlist</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>
					<form className="flex flex-col gap-2 p-3">
						<label>
							Add title:{" "}
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleFormChange}
								className="border focus:outline-none px-2 py-1"
								required
							/>
						</label>
						<label>
							Add description:{" "}
							<input
								type="text"
								name="description"
								value={formData.description}
								onChange={handleFormChange}
								className="border focus:outline-none px-2 py-1"
								required
							/>
						</label>
						<label>
							Add thumbnail url:{" "}
							<input
								type="url"
								name="thumbnail"
								value={formData.thumbnail}
								onChange={handleFormChange}
								className="border focus:outline-none px-2 py-1"
							/>
						</label>
						<button
							className="border bg-red-500 text-white px-3 py-1 rounded-md"
							onClick={handleFormSubmit}
						>
							Add Playlist
						</button>
					</form>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default PlayListPage;
