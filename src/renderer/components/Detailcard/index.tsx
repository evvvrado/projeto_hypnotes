/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Context } from 'renderer/contexts/NoteProvider';
import { CheckCircle, Export, Archive, X } from 'phosphor-react';

type TDetailCard = {
	modalClose?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toggleFunction: any;
};

const Detailcard: React.FC<TDetailCard> = ({ modalClose, toggleFunction }) => {
	const { selectedNote, setNotes, manageNotes } = useContext(Context);

	const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	const [warningModal, setWarningModal] = useState(false);

	Detailcard.defaultProps = {
		modalClose: false,
	};

	const handleCloseModal = () => {
		if (
			selectedNote &&
			(manageNotes.findById(selectedNote.id).title !==
				titleRef.current.innerText ||
				manageNotes.findById(selectedNote.id).content !==
					contentRef.current.innerHTML)
		) {
			setWarningModal(true);

			setTimeout(() => {
				setWarningModal(false);
			}, 320);
		} else {
			toggleFunction();
		}
	};

	const handleArchiveNote = async () => {
		if (!selectedNote) return;

		const newNotes = await manageNotes.archiveNote(selectedNote.id);
		setNotes(newNotes);
		toggleFunction();
	};

	const handleSaveNote = async () => {
		let newNotes;

		if (selectedNote) {
			newNotes = await manageNotes.saveNote(
				selectedNote.id,
				titleRef.current.innerText,
				contentRef.current.innerHTML
			);
		}

		if (!selectedNote) {
			manageNotes.addNewNote({
				title: titleRef.current.innerText,
				content: contentRef.current.innerHTML,
			});

			newNotes = await manageNotes.getNotes();

			toggleFunction();
		}

		setNotes(newNotes);
	};

	useLayoutEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.which === 83) {
				e.preventDefault();
				handleSaveNote();
			}
		});
	});

	if (modalClose) return <></>;

	return (
		<>
			<div
				className={`modal detail__card ${
					warningModal && 'warningModal'
				}`}
			>
				<div className="modal__box">
					<div className="modal__actions">
						{selectedNote && (
							<>
								<button
									type="button"
									className="modal__icon"
									disabled
									onClick={handleCloseModal}
								>
									<Export size={18} />
								</button>

								<button
									type="button"
									className="modal__icon"
									onClick={handleArchiveNote}
								>
									<Archive size={18} />
								</button>
							</>
						)}

						<button
							type="button"
							className="modal__icon"
							onClick={handleCloseModal}
						>
							<X size={18} />
						</button>
					</div>
					<div className="modal__content">
						<strong
							className="modal__content__title"
							ref={titleRef}
							contentEditable="true"
							// eslint-disable-next-line react/no-danger
						>
							{selectedNote
								? selectedNote.title
								: 'Digite o Título...'}
						</strong>

						<div className="modal__content__wrapper">
							<div
								className="modal__content__text"
								ref={contentRef}
								contentEditable="true"
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{
									__html: selectedNote
										? selectedNote.content
										: 'Digite o conteúdo...',
								}}
							/>
						</div>
					</div>
				</div>

				<button
					type="button"
					className="modal__close"
					onClick={handleCloseModal}
				/>
			</div>

			<button
				className="save__detail__card"
				type="button"
				onClick={handleSaveNote}
			>
				<CheckCircle size={40} />
			</button>
		</>
	);
};

export default Detailcard;
