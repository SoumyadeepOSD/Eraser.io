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
import { Button } from '@/components/ui/button';

const Workspace = ({ params }: any) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<fileInterface | undefined | any>();
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getFileData = async () => {
    try {
      setLoading(true);
      const result = await convex.query(api.files.getFileById, { _id: params.field });
      console.log(result);
      setFileData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching file data:", error);
      toast.error("Error fetching file data");
      setLoading(false);
    }
  };


  const userData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/kindeSession")
      const data = await response.json();
      setUser(data?.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    params.field && getFileData();
    params.field && userData();
  }, [params.field]);

  const sendRequestToAuthor = async()=>{
    try {
      console.log(`${user?.given_name} Wants to access ${fileData?.fileName}`);
    } catch (error) {
      console.log(error);
    }
  }

  // Check, if the createdBy field is equal to user's email ID, then proceed forward, else show a div with text you are not allowed to access it
  if (fileData?.createdBy !== user?.email) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center">You are not allowed to access this file</h1>
        <Button onClick={sendRequestToAuthor}>
          Request Author for Access Permission
        </Button>
      </div>
    );
  }
  else if(loading){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }
  
  else {
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
}

export default Workspace;
