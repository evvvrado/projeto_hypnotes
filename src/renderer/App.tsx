import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';

import { NoteProvider } from './contexts/NoteProvider';

export default function App() {
	return (
		<NoteProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</NoteProvider>
	);
}
