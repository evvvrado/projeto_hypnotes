import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Context } from 'renderer/contexts/NoteProvider';
import { INoteCard } from 'renderer/@types/INoteCard';
import Menu from '../Menu';
import Notecard from '../Notecard';

const Main: React.FC = () => {
	const { modalClose, handleToggleModal, filteredNotes } =
		useContext(Context);

	const mainRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	const [visualNotes, setVisualNotes] = useState<INoteCard[]>([
		...filteredNotes,
	]);

	const handleRenderNotes = async () => {
		const gridGap = 20;
		let highestTop = 0;

		const hasWrapperChildren = wrapperRef.current.children
			? wrapperRef.current.children
			: [];

		const firstDomNote = hasWrapperChildren[0];
		const firstDomNoteWidth = firstDomNote ? firstDomNote.clientWidth : 0;

		const maxPerRow = firstDomNote
			? Math.floor(
					mainRef.current.offsetWidth / (firstDomNoteWidth + gridGap)
			  )
			: 1;

		await setVisualNotes([...filteredNotes]);

		setVisualNotes(
			[...filteredNotes].map((note, index) => {
				const noteColumn = index % maxPerRow;
				const atualDomNote = hasWrapperChildren[index];
				const atualDomNoteHeight =
					atualDomNote && atualDomNote.clientHeight;

				const previousNoteIndex = index - maxPerRow;
				const previousDomNote = hasWrapperChildren[previousNoteIndex];

				const previousDomNoteHeight =
					previousDomNote && previousDomNote.clientHeight;

				note.y =
					index >= maxPerRow
						? filteredNotes[previousNoteIndex].y +
						  previousDomNoteHeight +
						  gridGap
						: 0;

				note.x = noteColumn * (firstDomNoteWidth + gridGap);

				if (
					index >= maxPerRow &&
					note.y + atualDomNoteHeight > highestTop
				) {
					highestTop = note.y + atualDomNoteHeight;
				}

				return {
					id: note.id,
					title: note.title,
					content: note.content,
					x: note.x,
					y: note.y,
					active: note.active,
				};
			})
		);

		wrapperRef.current.setAttribute('style', `height: ${highestTop}px`);
	};

	window.addEventListener('resize', () => {
		handleRenderNotes();
	});

	useLayoutEffect(() => {
		handleRenderNotes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredNotes]);

	return (
		<main ref={mainRef}>
			<div className="container">
				<div className="wrapper" ref={wrapperRef}>
					{visualNotes.map((note: INoteCard) => {
						return (
							<Notecard
								id={note.id}
								x={note.x}
								y={note.y}
								active={note.active}
								key={`${note.id} ${note.title}`}
								title={note.title}
								content={note.content}
							/>
						);
					})}
				</div>
			</div>

			<Menu
				handleToggleModal={handleToggleModal}
				modalClose={modalClose}
			/>
		</main>
	);
};

export default Main;
