/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useState } from 'react';
import { INoteCard } from 'renderer/@types/INoteCard';
import ManageNotes from 'renderer/classes/ManageNotes';

type INoteProvider = {
	children?: ReactNode | undefined;
};

type NoteProviderType = {
	selectedNote?: INoteCard;
	setSelectedNote: any;
	notes: Array<INoteCard>;
	setNotes: any;
	search: string;
	setSearch: any;
	filteredNotes: Array<INoteCard>;
	setFilteredNotes: any;
	modalClose: boolean;
	handleToggleModal: any;
	manageNotes: any;
};

const Context = createContext({} as NoteProviderType);

const NoteProvider: React.FC<INoteProvider> = ({ children }) => {
	NoteProvider.defaultProps = {
		children: null,
	};

	const manageNotes = new ManageNotes();

	const [notes, setNotes] = useState<INoteCard[]>(manageNotes.getNotes());

	const [filteredNotes, setFilteredNotes] = useState<INoteCard[]>(
		[...notes].filter((note) => {
			return note.active;
		})
	);

	const [selectedNote, setSelectedNote] = useState<INoteCard>();

	const [modalClose, setModalClose] = useState(true);

	const [search, setSearch] = useState('');

	const handleToggleModal = async (reset: false) => {
		if (reset) setSelectedNote(undefined);
		setModalClose(!modalClose);
		setNotes(manageNotes.getNotes());
	};

	return (
		<Context.Provider
			value={{
				selectedNote,
				setSelectedNote,
				filteredNotes,
				setFilteredNotes,
				notes,
				setNotes,
				search,
				setSearch,
				modalClose,
				handleToggleModal,
				manageNotes,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export { Context, NoteProvider };
