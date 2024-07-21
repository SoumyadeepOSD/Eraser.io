import React, { useEffect, useState } from 'react';
import SideNavTopSection from './SideNavTopSection';
import SideNavBottomSection from './SideNavBottomSection';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

type Props = {}

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
    const onFileCreate = (fileName: string) => {
        console.log("File created:", fileName);
        createFile({
            fileName: fileName,
            teamId: activeTeam?._id,
            createdBy: user?.email,
        }).then(res=>{
            if(res)
            {
                toast.success('File created successfully!');
            }
        },(e)=>{
            toast.error(`Some error ocuured while creating the file ${e}`);
        })
    }
    const [activeTeam, setActiveTeam] = useState<any>(null);
    return (
        <div
            className="h-screen fixed w-72 border-r p-6 flex flex-col"
        >
            <div className="flex-1">
                <SideNavTopSection user={user} setActiveTeamInfo={(activeteam: any) => setActiveTeam(activeteam)} />
            </div>

            <div>
                <SideNavBottomSection onFileCreate={onFileCreate} />
            </div>
        </div>
    )
}

export default SideNav