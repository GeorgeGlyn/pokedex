import { AppBar } from '@mui/material';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import './App.css';
import AppNavigator from './components/AppNavigator';
import Pokedex from './components/Pokedex';

function App() {
  return (
    <div className="App">
      <Router>
        <AppNavigator />
        <Route path='/' element={<Pokedex />} />
      </Router>
    </div>
  );
}

export default App;
