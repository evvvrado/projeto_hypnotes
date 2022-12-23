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

const TitleBar: React.FC = () => {
	const handleMenuTray = async () => {
		window.electron.ipcRenderer.sendMessage('menu-tray', '');
	};
	const handleResize1 = async () => {
		window.electron.ipcRenderer.sendMessage('resize-1', '');
	};
	const handleResize2 = async () => {
		window.electron.ipcRenderer.sendMessage('resize-2', '');
	};
	const handleResize3 = async () => {
		window.electron.ipcRenderer.sendMessage('resize-3', '');
	};
	const handleMaximize = async () => {
		window.electron.ipcRenderer.sendMessage('maximize', '');
	};
	const handleClose = async () => {
		window.electron.ipcRenderer.sendMessage('close', '');
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
