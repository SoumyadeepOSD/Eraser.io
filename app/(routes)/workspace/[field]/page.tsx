"use client";

import React, { useEffect } from 'react'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'
import Editor from '../_components/Editor';
import { useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { fileInterface } from '../../dashboard/_components/FileList';

const Workspace = ({params}:any) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<fileInterface | any | undefined>();
  
  const getFileData = async() => {
    const result = await convex.query(api.files.getFileById, { _id: params.field });
    console.log(result);
    setFileData(result);
  }

  useEffect(()=>{
    params.field && getFileData();
  },[]);
  return (
    <div>
      <WorkSpaceHeader onSave={()=>setTriggerSave(!triggerSave)}/>

      {/* WorkSpace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Document */}
          <div className="h-screen">
            <Editor onSaveTrigger={triggerSave} fileId={params.field} fileData={fileData}/>
          </div>

          
          
          {/* Whiteboard/canvas */}
          <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
}

export default Workspace;