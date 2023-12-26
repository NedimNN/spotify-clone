import { useState, createContext } from "react";
import './App.css';
import Layout from './components/Layout/Layout';

export const DataContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [playerState, setPlayerState] = useState({
    currentSongs: [],
    currentIndex: 0,
    isPlaying: false,
    activeSong: {},
  });



  return (
    <DataContext.Provider value={{ token, setToken, user, setUser, playerState, setPlayerState }}>
      <Layout />
    </DataContext.Provider>

  );
}

export default App;
