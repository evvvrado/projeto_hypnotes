import React, { useLayoutEffect, useRef } from 'react';
import { Archive, DotsThreeOutlineVertical, Gear, Plus } from 'phosphor-react';
import Detailcard from '../Detailcard';

// import { Container } from './styles';

type TMenu = {
	modalClose: boolean;
	handleToggleModal: unknown;
};

const Menu: React.FC<TMenu> = ({ modalClose, handleToggleModal }) => {
	const menuRef = useRef<any>();

	const handleToggleMenu = () => {
		const menuNode = menuRef.current;
		menuNode?.classList.toggle('show');
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
				<small>CTRL + K</small>
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
						disabled
					>
						<Archive size={23} />
						<span>Anotações Arquivadas</span>
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

						<small>CTRL + N</small>
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
