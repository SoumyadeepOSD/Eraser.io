import React from 'react'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'
import Editor from '../_components/Editor';


const Workspace = ({params}:any) => {
  return (
    <div>
      <WorkSpaceHeader/>

      {/* WorkSpace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Document */}
          <div className="h-screen">
            <Editor/>
          </div>

          
          
          {/* Whiteboard/canvas */}
          <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
}

export default Workspace;