
import './App.css'
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

function App() {
  const [dbData, setDbData] = useState('')

  useEffect(() => {
    fetch("http://localhost:3001/users", { mode: "no-cors" })
            .then(res => {
              console.log(res);
              res.json();
            });
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Typography variant="body1">
          {dbData}
        </Typography>
      </header>
    </div>
  )
}

export default App
