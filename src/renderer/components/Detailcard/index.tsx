/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { Context } from 'renderer/contexts/NoteProvider';
import { CheckCircle, Archive, X } from 'phosphor-react';
import TextEditor from '../TextEditor';

type TDetailCard = {
	modalClose?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toggleFunction: any;
};

const Detailcard: React.FC<TDetailCard> = ({ modalClose, toggleFunction }) => {
	const { selectedNote, setNotes, manageNotes } = useContext(Context);

	const titleRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const contentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
	const detailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	const [cachedContent, setCachedContent] = useState(null);

	Detailcard.defaultProps = {
		modalClose: false,
	};

	const getAtualContent = () => {
		return contentRef.current.editorContainer.querySelector(
			'div[data-contents="true"]'
		).innerHTML;
	};

	const handleCloseModal = () => {
		const atualContent = getAtualContent();

		if (
			selectedNote &&
			cachedContent &&
			(manageNotes.findById(selectedNote.id).title !==
				titleRef.current.value ||
				cachedContent !== atualContent)
		) {
			detailRef.current.classList.add('warningModal');

			console.log(cachedContent, '\n', atualContent);

			setTimeout(() => {
				if (!modalClose) {
					detailRef.current.classList.remove('warningModal');
				}
			}, 320);
		} else {
			toggleFunction(true);
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

		const atualContent = await getAtualContent();

		if (selectedNote) {
			newNotes = await manageNotes.saveNote(
				selectedNote.id,
				titleRef.current.value,
				atualContent
			);

			detailRef.current.classList.add('savingModal');

			setTimeout(() => {
				if (!modalClose) {
					detailRef.current?.classList.remove('savingModal');
				}
			}, 320);
		}

		if (!selectedNote) {
			manageNotes.addNewNote({
				title: titleRef.current.value,
				content: atualContent,
			});

			newNotes = await manageNotes.getNotes();

			toggleFunction();
		}

		setCachedContent(null);
		setNotes(newNotes);
	};

	useLayoutEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.which === 83) {
				e.preventDefault();
				if (!modalClose) handleSaveNote();
			} else if (e.ctrlKey && e.which === 78) {
				e.preventDefault();
				if (modalClose) toggleFunction(true);
			} else if (e.ctrlKey && e.which === 87) {
				e.preventDefault();
				// handleMenuTray();
			}
		});
	});

	useEffect(() => {
		if (!contentRef.current) return;

		setCachedContent(getAtualContent());
	}, [modalClose, setCachedContent]);

	if (modalClose) return <></>;

	return (
		<>
			<div ref={detailRef} className="modal detail__card">
				<div className="modal__box">
					<div className="modal__actions">
						{selectedNote && (
							<>
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
						<input
							type="text"
							name="modal__content__title"
							className="modal__content__title"
							ref={titleRef}
							defaultValue={
								selectedNote
									? selectedNote.title
									: 'Digite o Título...'
							}
						/>

						<div className="modal__content__wrapper">
							<TextEditor
								value={
									selectedNote?.content ??
									'Digite a conteúdo...'
								}
								contentRef={contentRef}
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
				<CheckCircle size={23} />
				<span>Salvar Anotação</span>
				<kbd>CTRL + S</kbd>
			</button>
		</>
	);
};

export default Detailcard;
