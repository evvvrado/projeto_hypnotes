/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import {
	FrameCorners,
	Layout,
	List,
	Lock,
	LockOpen,
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
	handleToggleAlwaysOnTop,
} from 'renderer/classes/ManageWindow';

const TitleBar: React.FC = () => {
	const [isLocked, setIsLocked] = useState(false);
	const [showLayoutMenu, setShowLayoutMenu] = useState(false);

	const handleToggleLockes = () => {
		handleToggleAlwaysOnTop();
		setIsLocked(!isLocked);
	};

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
				className={`titleBar__toggleLockButton ${isLocked && 'locked'}`}
				onClick={handleToggleLockes}
			>
				{!isLocked ? <LockOpen size={18} /> : <Lock size={18} />}
			</button>

			<button
				type="button"
				className="titleBar__toggleLockButton"
				onClick={() => setShowLayoutMenu(!showLayoutMenu)}
			>
				<Layout size={18} />
			</button>

			<div
				className={`titleBar__layoutItems ${
					showLayoutMenu && 'active'
				}`}
			>
				<button
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
				</button>
			</div>

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
