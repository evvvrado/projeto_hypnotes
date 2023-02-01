/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {
	FrameCorners,
	List,
	NumberSquareOne,
	NumberSquareThree,
	NumberSquareTwo,
	PictureInPicture,
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

			{/* <button
				type="button"
				className="titleBar__resizeTwoButton"
				onClick={handleResize1}
			>
				<NumberSquareOne size={18} />
			</button>

			<button
				type="button"
				className="titleBar__resizeTwoButton"
				onClick={handleResize2}
			>
				<NumberSquareTwo size={18} />
			</button>

			<button
				type="button"
				className="titleBar__resizeTreeButton"
				onClick={handleResize3}
			>
				<NumberSquareThree size={18} />
			</button> */}

			<button
				type="button"
				className="titleBar__maxButton"
				onClick={handleMaximize}
			>
				<FrameCorners size={18} />
			</button>

			<button
				type="button"
				className="titleBar__closeButton"
				onClick={handleClose}
			>
				<X size={18} color="red" />
			</button>
		</section>
	);
};

export default TitleBar;
