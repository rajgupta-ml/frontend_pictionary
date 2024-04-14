/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useRef, useState } from "react";
import { handleDrawing } from "../connection/wsConnection";
import { usePlayerRoom } from "../context/playerContext";

const CanvasContext = React.createContext();

const BATCH_SIZE = 10;
let batchBuffer = []


export const CanvasProvider = ({ children }) => {
    const { handleDrawingCoordinates } = usePlayerRoom();
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        if (handleDrawingCoordinates.length > 0) {
            handleDrawingCoordinates.forEach(element => {
                const { offsetX, offsetY, isStart, isEnd } = element;
                if (isStart) {
                    contextRef.current?.beginPath();
                    contextRef.current?.moveTo(offsetX, offsetY);
                } else if (isEnd) {
                    contextRef.current?.closePath();
                } else {
                    contextRef.current?.lineTo(offsetX, offsetY);
                    contextRef.current?.stroke();
                }
            });
        }
    }, [handleDrawingCoordinates]);


    const prepareCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `80vh`;
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    };

    const startDrawing = ({ nativeEvent }) => {
        const { clientX, clientY } = nativeEvent;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = (clientX - rect.left) * (canvas.width / rect.width);
        const offsetY = (clientY - rect.top) * (canvas.height / rect.height);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);

        batchBuffer.push({ offsetX, offsetY, isStart: true })
        if (batchBuffer.length > BATCH_SIZE) {
            handleDrawing(batchBuffer);
            batchBuffer = [];
        }

    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
        batchBuffer.push({ isEnd: true })
        if (batchBuffer.length > BATCH_SIZE) {
            handleDrawing(batchBuffer);
            batchBuffer = [];
        }
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { clientX, clientY } = nativeEvent;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const offsetX = (clientX - rect.left) * (canvas.width / rect.width);
        const offsetY = (clientY - rect.top) * (canvas.height / rect.height);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        batchBuffer.push({ offsetX, offsetY, isStart: false })
        if (batchBuffer.length > BATCH_SIZE) {
            handleDrawing(batchBuffer);
            batchBuffer = [];
        }

    };


    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                clearCanvas,
                draw,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);
