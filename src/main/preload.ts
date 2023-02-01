import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = [
	'ipc-example',
	'close',
	'maximize',
	'tray',
	'resize-3',
	'resize-2',
	'resize-1',
	'toggle-always-top'
];

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: {
		invoke(channel: Channels, args: unknown[]) {
			ipcRenderer.invoke(channel, args);
		},
		sendMessage(channel: Channels, args: unknown[]) {
			ipcRenderer.send(channel, args);
		},
		on(channel: Channels, func: (...args: unknown[]) => void) {
			const subscription = (
				_event: IpcRendererEvent,
				...args: unknown[]
			) => func(...args);
			ipcRenderer.on(channel, subscription);

			return () => {
				ipcRenderer.removeListener(channel, subscription);
			};
		},
		once(channel: Channels, func: (...args: unknown[]) => void) {
			ipcRenderer.once(channel, (_event, ...args) => func(...args));
		},
	},
});
