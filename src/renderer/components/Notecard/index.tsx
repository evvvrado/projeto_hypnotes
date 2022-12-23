/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext } from 'react';
import { CornersOut } from 'phosphor-react';
import { INoteCard } from 'renderer/@types/INoteCard';

import { Context } from 'renderer/contexts/NoteProvider';

const Notecard: React.FC<INoteCard> = ({
	id,
	title,
	content,
	x,
	y,
	active,
}) => {
	const { setSelectedNote, handleToggleModal } = useContext(Context);

	const handleSetSelectedNote = () => {
		setSelectedNote({
			id,
			title,
			content,
			x,
			y,
			active,
		});

		handleToggleModal();
	};

	return (
		<div
			className="notecard"
			style={{ left: x, top: y }}
			onClick={handleSetSelectedNote}
		>
			<div className="notecard__expand-button">
				<CornersOut size={17} />
			</div>

			<strong className="notecard__title">{title}</strong>

			<div className="notecard__content">
				<div
					className="notecard__content__text"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</div>
		</div>
	);
};

export default Notecard;
