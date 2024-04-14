/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

export const PlayerRoomContext = createContext();

export const PlayerRoomProvider = ({ children }) => {
    const [playerId, setPlayerId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [currentDrawer, setCurrentDrawer] = useState(null);
    const [word, setWord] = useState(null);
    const [gameMessage, setGameMessage] = useState();
    const [handleDrawingCoordinates, setHandleDrawingCoordinates] = useState([])
    const [playerScore, setPlayerScore] = useState([]);
    const [guessed, SetGuesedDetails] = useState();
    return (
        <PlayerRoomContext.Provider value={{ playerId, setPlayerId, roomId, setRoomId, currentDrawer, setCurrentDrawer, word, setWord, gameMessage, setGameMessage, handleDrawingCoordinates, setHandleDrawingCoordinates, playerScore, setPlayerScore, guessed, SetGuesedDetails }}>
            {children}
        </PlayerRoomContext.Provider>
    );
};

export const usePlayerRoom = () => useContext(PlayerRoomContext);
