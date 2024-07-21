import React, { useEffect, useState } from 'react';
import SideNavTopSection from './SideNavTopSection';

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
            className="bg-gray-100 h-screen fixed w-72 border-r p-6"
        >
           <SideNavTopSection user={user}/>
        </div>
    )
}

export default SideNav