import React from 'react';
import Footer from 'renderer/components/Footer';
import Header from 'renderer/components/Header';
import Main from 'renderer/components/Main';
import TitleBar from 'renderer/components/TitleBar';

const Home: React.FC = () => {
	return (
		<>
			{/* LAYOUT */}

			<TitleBar />
			<Header />
			<Main />
			<Footer />
		</>
	);
};

export default Home;
