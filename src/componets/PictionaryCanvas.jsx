/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import "../css/pictionaryCanvas.css"
import copy from "../assets/copy.png"
import { useContext, useEffect, useState } from "react";
import { useCanvas } from "../helper/CanvasProvider";
import { handleGuess, onEndGame, onStartGame } from "../connection/wsConnection";
import { PlayerRoomContext } from "../context/playerContext";


const ChatAreaComponet = ({ message }) => {
    return (
        <div className="chatBox">
            {message}
        </div>

    )
}

const PlayerComponetContainer = ({ connectionId, score }) => {
    return (
        <tr className="values">
            <td>{connectionId}</td>
            <td>{score}</td>
        </tr>

    )
}



const PictionaryCanvas = () => {
    const { playerId, roomId, currentDrawer, word, gameMessage, playerScore, guessed } = useContext(PlayerRoomContext);
    const [guess, setGuess] = useState()
    const [messages, setMessages] = useState([]);
    const [playerValue, setPlayerValue] = useState([]);
    const [guessDetails, setGuessDetailsPic] = useState();
    useEffect(() => {
        setMessages(prevMessages => [...prevMessages, gameMessage]);
    }, [gameMessage]);

    useEffect(() => {
        setGuessDetailsPic(guessed)
    }, [guessed])
    const handleGuessBtn = () => {
        setMessages((prev) => [...prev, guess]);
        handleGuess(guess)
    }



    useEffect(() => {
        setPlayerValue(playerScore);
    }, [playerScore]);


    const handleGuessChange = (e) => {
        // Update the guess state with the new input value
        setGuess(e.target.value);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(localStorage.getItem("roomId"));
        alert("Copied to the clipboard")
    }

    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
        clearCanvas
    } = useCanvas();


    useEffect(() => {
        prepareCanvas();
    }, []);


    return (
        <>
            <div className="canvas">

                <div className="headerContainer">
                    <div className="header">
                        <div className={currentDrawer == playerId ? "playerId" : "playerIdDrawer"}>
                            <h4>Player Id :</h4>
                            <span>{playerId}</span>
                        </div>

                        <div className="DrawingWord">
                            <h4>Word: </h4>
                            <span>{!word ? "Start guessing!" : word}</span>
                        </div>

                        <div className="roomCode">
                            <h4>Room Code: </h4>
                            <div className="roomCodeCopy">
                                <div className="roomCode-container">
                                    {roomId}
                                </div>
                                <img src={copy} onClick={copyToClipboard} className="icon" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="playersCanvasContainer">
                    <div className="playersScoreContainer">

                        <div className="leftContainer">

                            <h1>Players</h1>
                            <div className="playersContainer">


                                <table className="PlayerContainer">
                                    <thead>
                                        <tr className="Heading">
                                            <th>Connection ID</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {playerValue && playerValue.map(({ connectionId, score }) => (
                                            <PlayerComponetContainer key={connectionId} connectionId={connectionId} score={score} />
                                        ))}
                                    </tbody>



                                </table>



                            </div>

                        </div>
                        <div className="btnbtn">

                            <button className="clearCanvas" onClick={clearCanvas}>Clear Canvas</button>
                            <button className="StartGameBtn" onClick={() => onStartGame()}>Start Game</button>
                            <button className="EndGameBtn" onClick={() => { onEndGame(); clearCanvas() }}>End Game</button>
                        </div>
                    </div>

                    <div className="playerCanvas">
                        <canvas
                            onMouseDown={startDrawing}
                            onMouseUp={finishDrawing}
                            onMouseMove={draw}
                            ref={canvasRef}
                            className="canvasBoard"
                        />
                    </div>

                    <div className="rightContainer">

                        <div className="GuessWord">
                            {guessDetails ? (
                                <>
                                    <h4>{`${guessDetails.player} guessed`}</h4>
                                    <h2>{guessDetails.guessed}</h2>
                                </>
                            ) : (
                                <h1>Haven&apos;t started guessing</h1>
                            )}
                        </div>


                        <div className="chatArea">
                            <h1>Chat Area</h1>
                            {messages.map((message, index) => (
                                <ChatAreaComponet key={index} message={message} />
                            ))}
                            <div className="chatAreaBtn">
                                <input onChange={handleGuessChange} type="text" placeholder="Enter the Guess" value={guess} />
                                <button type="submit" onClick={handleGuessBtn}>{"=>"}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}


export default PictionaryCanvas
