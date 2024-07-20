"use client";
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

type Props = {
    children: React.ReactNode
}

const DashBoardLayout = ({ children }: Props) => {

    const [email, setEmail] = useState("");
    const convex = useConvex();
    const router = useRouter();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/kindeSession")
            const data = await response.json();
            setEmail(data.user?.email);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])



    const checkTeam = async () => {

        const result = await convex.query(api.team.getTeam, { email: email });
        if (!result.length) {

            router.push("teams/create");
            toast.error(`No of teams: ${result.length}`);
        }
    }

    useEffect(()=>{
        email && checkTeam();
    },[email]);
    

    return (
        <div>
            {children}
        </div>
    )
}

export default DashBoardLayout