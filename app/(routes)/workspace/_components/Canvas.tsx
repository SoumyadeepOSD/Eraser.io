import React, { useEffect, useState } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import { fileInterface } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Canvas({onSaveTrigger,fileId,fileData}:{onSaveTrigger:boolean, fileId:any, fileData:fileInterface}) {
    
    const [whiteBoardData, setWhiteBoardData]=useState<any>();

    const updateWhiteBoard = useMutation(api.files.updateWhiteBoard);

    useEffect(()=>{
        onSaveTrigger&&saveWhiteBoard();
    },[onSaveTrigger]);
    const saveWhiteBoard = () => {
        updateWhiteBoard({
            _id:fileId,
            whiteboard:JSON.stringify(whiteBoardData)
        }).then(res=>console.log(res)).catch(e=>console.log(e));
    }  
  
    return (
    <div style={{ height: "650px" }}>
      {fileData&&<Excalidraw 
      theme='light'
      initialData={{
        elements: fileData.whiteboard&& JSON.parse(fileData.whiteboard)
      }}
        onChange={(excalidrawElements)=>{
          setWhiteBoardData(excalidrawElements);}}
        UIOptions={{
            canvasActions:{
                saveToActiveFile: false
            }
        }}
      />}
    </div>
  )
}

export default Canvas