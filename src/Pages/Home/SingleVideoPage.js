import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { videoContext } from "../../Context/videoContext";
import {
	MdDelete,
	MdEdit,
	MdOutlineEditNote,
	MdOutlinePlaylistAdd,
	MdWatchLater,
} from "react-icons/md";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";

const SingleVideoPage = () => {
	const { videoId } = useParams();
	const { state, dispatch } = useContext(videoContext);

	const [openAddToPlaylist, setOpenAddToPlaylist] = useState(false);

	const video = state.videos.find((video) => video._id === Number(videoId));
	const moreVideos = state.videos.filter(
		(item) =>
			video.chips.some((el) => el === item.category.toLowerCase()) &&
			item._id !== video._id
	);

	function addVideoToPlayList(playListId, videoId) {
		dispatch({
			type: "ADD VIDEO TO PLAYLIST",
			payload: { playListId, videoId },
		});

		setOpenAddToPlaylist(false);
	}

	// new playlist modal

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
		if (formData.title.trim() !== "") {
			dispatch({ type: "ADD PLAYLIST", payload: formData });
			setFormData({
				title: "",
				description: "",
				thumbnail: "",
			});
			setOpenPlayListModal(false);
		} else {
			alert("PLease add title to playlist");
		}
	}

	// Notes Modal

	const [openNotesModal, setOpenNotesModal] = useState(false);
	const [noteInput, setNoteInput] = useState("");

	function addNote() {
		dispatch({
			type: "ADD NOTE",
			payload: { videoId: video._id, note: noteInput },
		});
		setNoteInput("");
		setOpenNotesModal(false);
	}

	return (
		<div className="flex flex-col gap-2 lg:flex-row p-2">
			<div className="w-full lg:w-[60%] p-2 shadow-md shadow-gray-400">
				<iframe
					className="w-full"
					height="315"
					src={video.src}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen={true}
				></iframe>
				<div className="flex items-center justify-between gap-3 py-2">
					<div className="flex items-center gap-2">
						<img
							src="https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
							alt=""
							className="w-[20px] h-[20px] rounded-[50%]"
						/>
						<p className="font-bold">{video.title}</p>
					</div>
					<div className="flex items-center gap-2">
						<MdWatchLater
							size={20}
							className={`cursor-pointer ${
								video.watchLater && "text-blue-400"
							}`}
							onClick={() =>
								dispatch({ type: "ADD TO WATCH LATER", payload: video._id })
							}
						/>
						<MdOutlinePlaylistAdd
							size={20}
							className="cursor-pointer"
							onClick={() => setOpenAddToPlaylist(true)}
						/>
						<MdOutlineEditNote
							size={20}
							className="cursor-pointer"
							onClick={() => setOpenNotesModal(true)}
						/>
					</div>
				</div>
				{video.notes.length > 0 && (
					<div>
						<h1 className="text-xl font-bold">My Notes:</h1>
						{video.notes.map((note, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between my-1 px-3 py-1"
							>
								<span>{note}</span>
								<span className="flex items-center gap-3">
									<MdEdit size={20} />
									<MdDelete size={20} />
								</span>
							</div>
						))}
					</div>
				)}
			</div>
			{/* playlist modal */}
			<Modal
				isOpen={openAddToPlaylist}
				onClose={() => setOpenAddToPlaylist(false)}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add video to Play list</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className="p-2">
							{state.playList.length === 0 ? (
								<p>No playlist found.</p>
							) : (
								<div>
									<p className="text-lg font-bold">Your Playlists:</p>
									{state.playList?.map((item) => (
										<div className="flex items-center gap-2  border px-2 rounded-md py-1">
											<span
												key={item.id}
												className="cursor-pointer w-full"
												onClick={() => addVideoToPlayList(item.id, video._id)}
											>
												{item.title}
											</span>
											<RxCross2
												className="cursor-pointer"
												size={20}
												onClick={() =>
													dispatch({
														type: "REMOVE PLAYLIST",
														payload: item.id,
													})
												}
											/>
										</div>
									))}
								</div>
							)}

							<button
								className="border bg-red-500 text-white px-3 py-1 rounded-md my-2"
								onClick={() => setOpenPlayListModal(true)}
							>
								Create New Playlist
							</button>
							{/* New Playlist Modal */}
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
					</ModalBody>
				</ModalContent>
			</Modal>

			{/* Notes Modal */}

			<Modal isOpen={openNotesModal} onClose={() => setOpenNotesModal(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Note</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div>
							<input
								type="text"
								value={noteInput}
								onChange={(e) => setNoteInput(e.target.value)}
								placeholder="New note.."
								className="border focus:outline-none px-3 py-1 rounded-md"
							/>

							<button
								className="border bg-red-500 text-white px-3 py-1 rounded-md"
								onClick={addNote}
							>
								Add Note
							</button>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>

			<div className="lg:w-[40%] shadow-md shadow-gray-300 p-3">
				<h1 className="text-2xl font-bold">More Videos:</h1>
				{moreVideos?.map((video) => (
					<div className="flex gap-2 p-2" key={video._id}>
						<div className="w-[50%] h-[150px]">
							<img className="h-full w-full" src={video.thumbnail} alt="" />
						</div>
						<div className="w-[50%]">
							<p className="font-semibold">{video.title}</p>
							<p>{video.creator}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SingleVideoPage;
