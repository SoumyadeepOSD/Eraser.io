// [field]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import WorkSpaceHeader from '../_components/WorkSpaceHeader';
import Editor from '../_components/Editor';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { fileInterface } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';
import { toast } from 'sonner';

const Workspace = ({ params }: any) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<fileInterface | undefined>();
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const getFileData = async () => {
    try {
      const result = await convex.query(api.files.getFileById, { _id: params.field });
      console.log(result);
      setFileData(result);
    } catch (error) {
      console.error("Error fetching file data:", error);
      toast.error("Error fetching file data");
    }
  };

  useEffect(() => {
      params.field && getFileData();
  }, [params.field]);

  return (
    <div>
      <WorkSpaceHeader 
        onSave={() => setTriggerSave(!triggerSave)}
        fileData={fileData}
      />

      {/* WorkSpace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Document */}
        <div className="h-screen">
          <Editor 
            onSaveTrigger={triggerSave} 
            fileId={params.field} 
            fileData={fileData}
          />
        </div>

        {/* Whiteboard/canvas */}
        <div className="h-screen border-l border-gray-300">
          <Canvas
            onSaveTrigger={triggerSave} 
            fileId={params.field} 
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
