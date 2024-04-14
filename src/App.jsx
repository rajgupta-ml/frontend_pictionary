import { useState } from 'react';
import './App.css'
import JoinGroup from './componets/JoinGroup.jsx';
import wsConnection, { joinGroupWS } from './connection/wsConnection.jsx';

import { useNavigate } from "react-router-dom";
import { usePlayerRoom } from './context/playerContext.jsx';

function App() {
  const { setPlayerId, setRoomId, setCurrentDrawer, setWord, setGameMessage, setHandleDrawingCoordinates, setPlayerScore, SetGuesedDetails } = usePlayerRoom();
  const RouterSelection = (event) => {
    const type = event.type;
    console.log(event)
    switch (type) {
      case "connect":
        alert(event.message);
        break;
      case "JoinGroup":
        if (event.player_connectionId !== null) setPlayerId(event.player_connectionId)
        setRoomId(localStorage.getItem("roomId"))
        setPlayerScore(event.message.playerIds);
        setGameMessage(event.message.message);
        break;
      case "startGame":
        setGameMessage(event.message.message);
        setCurrentDrawer(event.message.current_drawer);
        setWord(event.message.word);
        break;
      case "endGame":
        console.log(event.message);
        break;
      case "handleDrawing":
        setHandleDrawingCoordinates(event.message.drawing.payload);
        break
      case "handleGuess":
        setGameMessage(`Player ${event.message.guesser} guessed ${event.message.guess}. The guess was ${event.message.correct ? 'correct' : 'incorrect'}.`)
        setPlayerScore(event.message.score);
        SetGuesedDetails({ "player": event.message.guesser, "guessed": event.message.guess });
        break;
      case "error":
        alert(JSON.stringify(event.message))
        break;
      default:
        alert(JSON.stringify(event.message))
    }
  }


  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate()

  const openPopup = () => {
    setPopupOpen(true);
    wsConnection(RouterSelection)
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const joinRoom = (roomId) => {
    joinGroupWS(roomId)
    navigate("/canvas");
  };

  return (
    <>
      <div className='AppContainer'>
        <h1>Welcome To the Pictionary Game</h1>
        <button className='StartGame' onClick={openPopup}>Start Game</button>
        {isPopupOpen && (
          <JoinGroup onClose={closePopup} onJoin={joinRoom} />
        )}
      </div>

    </>
  )
}

export default App
