"use client";
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FileListContext';

type Props = {
    children: React.ReactNode
}

const DashBoardLayout = ({ children }: Props) => {

    const [user, setUser] = useState<any>("");
    const [fileList_, setFileList_] = useState();
    const convex = useConvex();
    const router = useRouter();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/kindeSession")
            const data = await response.json();
            setUser(data?.user);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])



    const checkTeam = async () => {

        const result = await convex.query(api.team.getTeam, { email: user?.email });
        if (!result.length) {

            router.push("teams/create");
            toast.error(`No of teams: ${result.length}`);
        }
    }

    useEffect(() => {
        user?.email && checkTeam();
    }, [user?.email]);


    return (
        <div>
            <FileListContext.Provider value={{fileList_, setFileList_, user, checkTeam}}>
                <div className="grid grid-cols-4">
                    <div className="h-screen w-72 fixed">
                        <SideNav />
                    </div>
                    <div className="col-span-4 ml-72">
                        {children}
                    </div>
                </div>
            </FileListContext.Provider>
        </div>
    )
}

export default DashBoardLayout