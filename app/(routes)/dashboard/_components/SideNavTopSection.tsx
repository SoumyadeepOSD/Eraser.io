"use client";
import React, { Key, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, LayoutGrid, LogOut, Settings, Trash2, Users } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { Separator } from "@/components/ui/separator";
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { FileListContext } from '@/app/_context/FileListContext';

type Props = {
    user: any;
    setActiveTeamInfo: any
};

type TeamInterface = {
    teamName: string;
    createdBy: string;
    creationTime: string;
    _id: string;
};

const SideNavTopSection = ({ user, setActiveTeamInfo }: Props) => {
    const menu = [
        {
            id: 1,
            name: 'Create Team',
            path: '/teams/create',
            icon: Users,
        },
        {
            id: 2,
            name: 'Settings',
            path: '',
            icon: Settings,
        },
    ];
    const convex = useConvex();
    const router = useRouter();
    const [teamList, setTeamList] = useState<TeamInterface[] | undefined | any>();
    const [activeTeam, setActiveTeam] = useState<TeamInterface | undefined | any>();
    const deleteTeam = useMutation(api.team.DeleteTeam);
    const {checkTeam} = useContext(FileListContext);

    useEffect(()=>{
        activeTeam && setActiveTeamInfo(activeTeam);
    },[activeTeam]);

    // Get Team
    const getTeamList = async () => {
        const result = await convex.query(api.team.getTeam, { email: user?.email });
        const joinedTeam = await convex.query(api.team.getTeamByMemberId, {memberId: user.id});
        const allTeams = [...result, ...joinedTeam];
        
        setTeamList(allTeams);

        // Set the first team as active if available
        if (allTeams.length > 0) {
            setActiveTeam(allTeams[0]);
            setActiveTeamInfo(allTeams[0]); // Optional: Call this function to notify parent or perform any side-effect
        }
    };

    useEffect(() => {
        if (user) {
            getTeamList();
        }
    }, [user]);

    const onMenuClick = (item:any) => {
        if(item.path){
            router.push(item.path);
        }
    }

    // Delete Team 
    const onDeleteTeam = async(id:any, teamName:string)=>{
        try {
            const result = await deleteTeam({_id: id});
            console.log(result);
            toast.success(`${teamName} deleted successfully`);
            const updatedFileList = teamList?.filter((team: any) => team._id !== id);
            setTeamList(updatedFileList);
            getTeamList();
            checkTeam();
        } catch (error) {
            console.log(error);
            toast.error(`Failed to delete ${teamName}`);
        }
    }

    return (
        <div>
            <Toaster/>
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-lg cursor-pointer">
                        <Image
                            src="/logo-1.png"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                        <h2 className="flex gap-2 items-center font-bold text-[17px]">
                            {activeTeam?.teamName}
                            <ChevronDown />
                        </h2>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="ml-7 p-4">
                    {/* Team Section */}
                    <div>
                        {teamList?.map((item:any, index:Key) => (
                            <h2 
                                key={index} 
                                className={`flex flex-row justify-between items-center p-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-lg text-sm ${activeTeam?._id === item._id&&'bg-blue-500 text-white'}`}
                                onClick={() => setActiveTeam(item)}
                            >
                                {item.teamName}
                                {/* Delete Team */}
                                <Trash2 color="white" fill="red" onClick={()=>{
                                    onDeleteTeam(item._id, item.teamName);
                                }}/>
                            </h2>
                        ))}
                    </div>
                    <Separator className="mt-2 bg-slate-100" />
                    {/* Option Section */}
                    <div>
                        {menu.map((item, index) => (
                            <h2 
                                key={index} 
                                className="flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg text-sm"
                                onClick={()=>onMenuClick(item)}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </h2>
                        ))}
                        <LogoutLink>
                            <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg text-sm">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </h2>
                        </LogoutLink>
                    </div>
                    <Separator className="mt-2 bg-slate-100" />
                    {/* User Info Section */}
                    {user && (
                        <div className="mt-2 flex items-center gap-2">
                            <Image
                                src={user?.picture}
                                height={30}
                                width={30}
                                alt="user"
                                className="rounded-full"
                            />
                            <div>
                                <h2 className="text-[14px] font-bold">
                                    {user?.given_name} {user?.family_name}
                                </h2>
                                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* All files button */}
            <Button 
                variant='outline'
                className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100"
            >
                <LayoutGrid className="h-5 w-5"/>
                All Files
            </Button>
        </div>
    );
};

export default SideNavTopSection;
