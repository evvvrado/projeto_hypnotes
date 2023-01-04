import React from 'react';

import {
	Columns,
	DeviceMobile,
	DotsThreeOutline,
	List,
	PictureInPicture,
	Square,
	X,
} from 'phosphor-react';

import {
	handleMenuTray,
	handleResize1,
	handleResize2,
	handleResize3,
	handleMaximize,
	handleClose,
} from 'renderer/classes/ManageWindow';

const TitleBar: React.FC = () => {
	return (
		<section className="titleBar">
			<button type="button" className="titleBar__dragable">
				<List size={18} />
			</button>

			<button
				type="button"
				className="titleBar__miniButton"
				onClick={handleMenuTray}
			>
				<PictureInPicture size={18} />
			</button>

			<button
				type="button"
				className="titleBar__resizeTwoButton"
				onClick={handleResize1}
			>
				<DeviceMobile size={18} />
			</button>

			<button
				type="button"
				className="titleBar__resizeTwoButton"
				onClick={handleResize2}
			>
				<Columns size={18} />
			</button>

			<button
				type="button"
				className="titleBar__resizeTreeButton"
				onClick={handleResize3}
			>
				<DotsThreeOutline size={18} />
			</button>

			<button
				type="button"
				className="titleBar__maxButton"
				onClick={handleMaximize}
			>
				<Square size={18} />
			</button>

			<button
				type="button"
				className="titleBar__closeButton"
				onClick={handleClose}
			>
				<X size={18} />
			</button>
		</section>
	);
};

export default TitleBar;
