import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {}



const Header = (props: Props) => {
    const [user, setUser] = useState<any>(null);
    useEffect(()=>{
        fetch("/api/kindeSession").then((response) => response.json()).then((data) => {
            console.log(data);
            setUser(data.user);
        });
    },[]);
    
    return (
    <div className="flex justify-end w-full gap-2 items-center">
        <div className="flex gap-2 items-center border rounded-md p-2">
            <Search className="h-4 w-4"/>
            <input type="text" placeholder="Search..." />
        </div>
        <div>
            <Image src={user?.picture} alt="user" width={30} height={30} className="rounded-full" />
        </div>
        <Button className="gap2 flex h-8 hover:bg-blue-700 bg-blue-600">
            <Send className="h-4 w-4"/>
            Invite
        </Button>
    </div>
  )
}

export default Header