/* eslint-disable react-refresh/only-export-components */
const URL = "wss://mdxxc5zcoe.execute-api.ap-south-1.amazonaws.com/production/";
let socket = null;

const wsConnection = (RouterSelection) => {
    // Check if WebSocket connection is already open
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(URL);
        // Event listener for WebSocket open
        socket.addEventListener('open', () => {
            console.log("Websocket is connected")
        });
        // Event listener for WebSocket message
        socket.addEventListener('message', (event) => {
            RouterSelection(JSON.parse(event.data));
        });

        socket.addEventListener('error', (error) => {
            console.error("WebSocket error:", error);
        });

        socket.addEventListener("close", (e) => {
            console.log(e);
        })

    }
};



// Function to send drawing data through WebSocket

export const joinGroupWS = (roomId) => {
    // Check if WebSocket connection is open
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection is not open.");
        return;
    }

    // Send drawing payload through WebSocke
    socket.send(JSON.stringify({
        "action": "joinGroup",
        "roomId": roomId
    }));
}
export const handleDrawing = (payload) => {
    // Check if WebSocket connection is open
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection is not open.");
        return;
    }

    // Send drawing payload through WebSocke
    socket.send(JSON.stringify({
        "action": "handleDrawing",
        "payload": payload
    }));
};


export const handleGuess = (guessWord) => {
    // Check if WebSocket connection is open
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection is not open.");
        return;
    }

    // Send drawing payload through WebSocke
    socket.send(JSON.stringify({
        "action": "handleGuess",
        guessWord
    }));
};

// Function to start the game through WebSocket
export const onStartGame = () => {
    // Check if WebSocket connection is open
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection is not open.");
        return;
    }

    // Send start game action through WebSocket
    socket.send(JSON.stringify({
        "action": "startGame"
    }));
};

// Function to end the game through WebSocket
export const onEndGame = () => {
    // Check if WebSocket connection is open
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection is not open.");
        return;
    }

    // Send end game action through WebSocket
    socket.send(JSON.stringify({
        "action": "endGame"
    }));
};

export default wsConnection;
