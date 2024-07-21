"use client";

import React, { useEffect } from 'react'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'
import Editor from '../_components/Editor';
import { useState } from 'react';

const Workspace = ({params}:any) => {
  const [triggerSave, setTriggerSave] = useState(false);
  return (
    <div>
      <WorkSpaceHeader onSave={()=>setTriggerSave(!triggerSave)}/>

      {/* WorkSpace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Document */}
          <div className="h-screen">
            <Editor onSaveTrigger={triggerSave} fileId={params.field}/>
          </div>

          
          
          {/* Whiteboard/canvas */}
          <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
}

export default Workspace;