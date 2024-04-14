import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import PictionaryCanvas from './componets/PictionaryCanvas.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CanvasProvider } from './helper/CanvasProvider.jsx'
import { PlayerRoomProvider } from './context/playerContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerRoomProvider>
      <CanvasProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/canvas" element={<PictionaryCanvas />} />
          </Routes>
        </BrowserRouter>
      </CanvasProvider>
    </PlayerRoomProvider>
  </React.StrictMode >,
)
