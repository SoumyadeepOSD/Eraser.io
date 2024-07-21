import React, { useContext, useEffect, useState } from 'react';
import SideNavTopSection from './SideNavTopSection';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FileListContext';


type Props = {};

const SideNav = (props: Props) => {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        fetch("/api/kindeSession")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUser(data.user);
            })
    }, []);

    const createFile = useMutation(api.files.createFile);
    const convex = useConvex();
    const { fileList_,setFileList_ } = useContext(FileListContext);
    const onFileCreate = (fileName: string) => {
        console.log("File created:", fileName);
        createFile({
            fileName: fileName,
            teamId: activeTeam?._id,
            createdBy: user?.email,
            archive: false,
            document: '',
            whiteboard: '',
        }).then(res=>{
            if(res)
            {   
                getFiles();
                toast.success('File created successfully!');
            }
        },(e)=>{
            toast.error(`Some error ocuured while creating the file ${e}`);
        })
    }
    const [activeTeam, setActiveTeam] = useState<any>(null);
    const [totalFiles, setTotalFiles] = useState<Number>(0);
    const getFiles = async() => {
        const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });
        console.log(result);
        setFileList_(result);
        setTotalFiles(result.length);
    }
    useEffect(()=>{
        activeTeam && getFiles();
    },[activeTeam]);

    return (
        <div
            className="h-screen fixed w-72 border-r p-6 flex flex-col"
        >
            <div className="flex-1">
                <SideNavTopSection user={user} setActiveTeamInfo={(activeteam: any) => setActiveTeam(activeteam)} />
            </div>

            <div>
                <SideNavBottomSection 
                    totalFiles={totalFiles}
                    onFileCreate={onFileCreate} 
                />
            </div>
        </div>
    )
}

export default SideNav