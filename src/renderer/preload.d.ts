import { Channels } from 'main/preload';

declare global {
	interface Window {
		electron: {
			ipcRenderer: {
				invoke(channel: Channels, args: unknown[]): unknown;
				sendMessage(channel: Channels, args: unknown[]): void;
				on(
					channel: Channels,
					func: (...args: unknown[]) => void
				): (() => void) | undefined;
				once(
					channel: Channels,
					func: (...args: unknown[]) => void
				): void;
			};
		};
	}
}

export {};
