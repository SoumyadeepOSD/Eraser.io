import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Combine, Search, Send } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'




type Props = {}



const Header = (props: Props) => {
    const [user, setUser] = useState<any>(null);
    const [teamId, setTeamId] = useState<any>(null);
    const [receiverEmail, setReceiverEmail] = useState<any>(null);
    const [teamName, setTeamName] = useState<any>(null);
    const updateTeam = useMutation(api.team.updateTeam);
    const convex = useConvex();
    useEffect(() => {
        fetch("/api/kindeSession").then((response) => response.json()).then((data) => {
            console.log(data);
            setUser(data.user);
        });
    }, []);


    const onJoinTeam = async () => {
        try {
            const team = await convex.query(api.team.getTeamById, { _id: teamId });
            if (!team) {
                toast.error("Please enter a valid team ID");
                return;
            }

            // Add the user to the team's members list
            const res = await updateTeam({ _id: team._id, members: [user.id] });
            console.log("Result is", res);
            setTeamName(team.teamName);
            toast.success(`Joined ${team.teamName} successfully`);

            // await updateTeam({ _id: team._id, members: user._id });

        } catch (error) {
            console.log(error);
            toast.error("Can't join the team");
        }
    };


    return (
        <div className="flex justify-end w-full gap-2 items-center">
            {/* Join team */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Combine />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="flex flex-row items-center justify-between">
                        <h1 className="my-3">Join Another Team</h1>
                            <Input
                                placeholder="Enter team ID"
                                onChange={(e) => setTeamId(e.target.value)}
                            />
                            <Button onClick={onJoinTeam}>
                                Join
                            </Button>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>





            {/* User profile image */}
            <div>
                <Image src={user?.picture} alt="user" width={30} height={30} className="rounded-full" />
            </div>
            {/* User profile image */}

            {/* Invite button */}
            {/* <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="gap2 flex h-8 hover:bg-blue-700 bg-blue-600"
                        // onClick={sendInvitation}
                    >
                        <Send className="h-4 w-4" />
                        Invite
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                       
                        <div className="flex flex-row items-center justify-between">
                        <h1 className="my-3">Send Invite via email</h1>
                            <Input
                                placeholder="Enter email"
                                type='email'
                                onChange={(e) => setReceiverEmail(e.target.value)}
                            />
                            <Button onClick={sendInvitation}>
                                Send
                            </Button>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu> */}
            {/* Invite button */}



        </div>
    )
}

export default Header