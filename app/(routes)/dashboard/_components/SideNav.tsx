import React, { useEffect, useState } from 'react';
import SideNavTopSection from './SideNavTopSection';
import SideNavBottomSection from './SideNavBottomSection';

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
    },[]);


    return (
        <div
            className="h-screen fixed w-72 border-r p-6 flex flex-col"
        >
            <div className="flex-1">
           <SideNavTopSection user={user}/>
            </div>

            <div>
           <SideNavBottomSection/>
            </div>
        </div>
    )
}

export default SideNav