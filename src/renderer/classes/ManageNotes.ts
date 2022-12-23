import { INoteCard } from 'renderer/@types/INoteCard';

class ManageNotes {
	notes: INoteCard[] = [];

	findById(id: number) {
		const findedNoted = [
			...this.notes.filter((note) => {
				return note.id === id;
			}),
		];

		return findedNoted[0];
	}

	addNewNote({ title, content }) {
		localStorage.setItem(
			'notes',
			JSON.stringify([
				...this.notes,
				{
					id: this.notes.length,
					title,
					content,
					x: 0,
					y: 0,
					active: true,
				},
			])
		);
	}

	async saveNote(id: number, title: string, content: string) {
		const note: INoteCard = this.findById(id);

		note.title = title;
		note.content = content;

		localStorage.setItem('notes', JSON.stringify([...this.notes]));

		return this.notes;
	}

	async archiveNote(id: number) {
		this.findById(id).active = false;

		localStorage.setItem('notes', JSON.stringify([...this.notes]));
		return this.notes;
	}

	defineNotes() {
		this.notes = localStorage.getItem('notes')
			? JSON.parse(localStorage.getItem('notes'))
			: [];
	}

	getNotes() {
		this.defineNotes();
		return this.notes;
	}
}

export default ManageNotes;
