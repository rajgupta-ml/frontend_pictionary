/* eslint-disable react/prop-types */
import "../css/joinGroup.css"
import { useState } from "react";


const JoinGroup = ({ onClose, onJoin }) => {
    const [roomId, setRoomId] = useState('');

    const handleJoin = () => {
        onJoin(roomId);
        onClose();
        localStorage.setItem("roomId", roomId);
    };

    return (
        <>
            <div className="popupCanvas">
                <div className="popup">

                    <span className="close" onClick={onClose}>X</span>
                    <div className="inputContainer">

                        <input
                            className=".input"
                            type="text"
                            placeholder="Enter Room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <button className="joinGroupButton" onClick={handleJoin}>Join Room</button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default JoinGroup
