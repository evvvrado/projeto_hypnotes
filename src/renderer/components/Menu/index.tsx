import React, { useContext, useLayoutEffect, useRef } from 'react';
import {
	Activity,
	Archive,
	DotsThreeOutlineVertical,
	Export,
	Gear,
	Plus,
} from 'phosphor-react';
import ManageNotes from 'renderer/classes/ManageNotes';

import { Context } from 'renderer/contexts/NoteProvider';
import Detailcard from '../Detailcard';

type TMenu = {
	modalClose: boolean;
	handleToggleModal: () => void;
};

const Menu: React.FC<TMenu> = ({ modalClose, handleToggleModal }) => {
	const { handleToggleArchiveds, isActiveNotes } = useContext(Context);

	const menuRef = useRef<HTMLUListElement>(null);

	const handleToggleMenu = () => {
		const menuNode = menuRef.current;
		menuNode?.classList.toggle('show');
	};

	const CreateDownloadFile = (
		content: BlobPart,
		fileName: string,
		contentType: string
	) => {
		const a = document.createElement('a');
		const file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	};

	const handleExportNotes = async () => {
		const manageNotes = new ManageNotes();
		const atualNotes = await manageNotes.getNotes();

		CreateDownloadFile(
			JSON.stringify(atualNotes),
			'notes.json',
			'application/json'
		);
	};

	useLayoutEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.which === 75) {
				e.preventDefault();
				handleToggleMenu();
			}
		});
	});

	return (
		<>
			<button
				className="FloatButton"
				type="button"
				onClick={handleToggleMenu}
			>
				<DotsThreeOutlineVertical size={23} weight="fill" />
				<span>Menu</span>
				<kbd>CTRL + K</kbd>
			</button>

			<ul ref={menuRef} className="floatMenu">
				<li className="floatMenu__item">
					<button
						type="button"
						className="floatMenu__item__button"
						disabled
					>
						<Gear size={23} />
						<span>Configurações</span>
					</button>
				</li>
				<li className="floatMenu__item">
					<button
						type="button"
						className="floatMenu__item__button"
						onClick={handleExportNotes}
					>
						<Export size={23} />
						<span>Exportar Anotações</span>
					</button>
				</li>
				<li className="floatMenu__item">
					<button
						type="button"
						className="floatMenu__item__button"
						onClick={handleToggleArchiveds}
					>
						{isActiveNotes ? (
							<Archive size={23} />
						) : (
							<Activity size={23} />
						)}
						<span>
							{isActiveNotes
								? 'Anotações Arquivadas'
								: 'Anotações Ativas'}
						</span>
					</button>
				</li>
				<li className="floatMenu__item">
					<button
						type="button"
						className="floatMenu__item__button"
						onClick={handleToggleModal}
					>
						<Plus size={23} />
						<span>Adicionar Anotação</span>

						<kbd>CTRL + N</kbd>
					</button>
				</li>
			</ul>

			<Detailcard
				modalClose={modalClose}
				toggleFunction={handleToggleModal}
			/>
		</>
	);
};

export default Menu;
