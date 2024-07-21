import React from 'react'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'


const Workspace = ({params}:any) => {
  return (
    <div>
      <WorkSpaceHeader/>

      {/* WorkSpace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Document */}
          <div className="bg-blue-400 h-screen">Document</div>

          
          
          {/* Whiteboard/canvas */}
          <div className="bg-red-400 h-screen">Canvas</div>
      </div>
    </div>
  );
}

export default Workspace;