import React from 'react';
import { PlusCircle } from 'phosphor-react';
import Detailcard from '../Detailcard';

// import { Container } from './styles';

type TFloatButton = {
	modalClose: boolean;
	handleToggleModal: unknown;
};

const FloatButton: React.FC<TFloatButton> = ({
	modalClose,
	handleToggleModal,
}) => {
	return (
		<>
			<button
				className="floatButton"
				type="button"
				onClick={handleToggleModal}
			>
				<PlusCircle size={40} />
			</button>

			<Detailcard
				modalClose={modalClose}
				toggleFunction={handleToggleModal}
			/>
		</>
	);
};

export default FloatButton;
