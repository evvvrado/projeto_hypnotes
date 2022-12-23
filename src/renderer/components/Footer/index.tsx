import React from 'react';
import hypnoLogo from '../../../../assets/hypno_logo.png';

const Footer: React.FC = () => {
	return (
		<footer>
			<div className="container">
				<div className="wrapper">
					<img src={hypnoLogo} alt="logo hypno" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
