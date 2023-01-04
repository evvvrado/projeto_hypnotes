export const handleMenuTray = async () => {
	window.electron.ipcRenderer.sendMessage('menu-tray', '');
};
export const handleResize1 = async () => {
	window.electron.ipcRenderer.sendMessage('resize-1', '');
};
export const handleResize2 = async () => {
	window.electron.ipcRenderer.sendMessage('resize-2', '');
};
export const handleResize3 = async () => {
	window.electron.ipcRenderer.sendMessage('resize-3', '');
};
export const handleMaximize = async () => {
	window.electron.ipcRenderer.sendMessage('maximize', '');
};
export const handleClose = async () => {
	window.electron.ipcRenderer.sendMessage('close', '');
};
