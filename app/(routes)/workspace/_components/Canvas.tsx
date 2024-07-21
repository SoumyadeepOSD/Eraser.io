import React from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";

function Canvas() {
  return (
    <div style={{ height: "650px" }}>
      <Excalidraw 
        onChange={(excalidrawElements, appState, files)=>{
          console.log(excalidrawElements, appState, files);}}
        UIOptions={{
            canvasActions:{
                saveToActiveFile: false
            }
        }}
      />
    </div>
  )
}

export default Canvas