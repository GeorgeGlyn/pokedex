import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Pokedex from './components/Pokedex';
import AppNavigator from './components/AppNavigator';
import './App.css';
import PokemonDetails from "./components/PokemonDetails";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppNavigator />
          <Routes>
            <Route exact path="/" element={<Pokedex />} />
            <Route exact path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
