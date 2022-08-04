import './App.css';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

function App() {
	const [dbData, setDbData] = useState();

	const fetchUsersJSON = async () => {
		const response = await fetch('http://localhost:3001/users/');
		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
		}

		const users = await response.json();
		console.log(users);
		return users;
	};

	useEffect(() => {
		fetchUsersJSON().then((res) => setDbData(res));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<Typography variant="body1">{String(dbData)}</Typography>
			</header>
		</div>
	);
}

export default App;
