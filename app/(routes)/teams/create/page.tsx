"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from 'convex/react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

type Props = {}


const CreateTeam = (props: Props) => {
  
  
  const [teamName, setTeamname] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const createTeam = useMutation(api.team.CreateTeam);

  useEffect(() => {
    fetch("/api/kindeSession")
    .then((response) => response.json())
    .then((data) => {
      setEmail(data.user.email);
    });
  }, []);  
    
  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: email,
    }).then((data)=>{
      console.log(data);
      if(data)
        {
          router.push("/dashboard");
          toast.success("Team created successfully");
      }
    });
  }

  return (
    <div className="px-6 md:px-16 py-16">
      <Image src="/logo.svg" alt="logo" width={200} height={200} />
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3">What should we call your team?</h2>
        <h2 className="text-gray-500">You can always change this later from settings</h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">Team Name</label>
          <Input 
            placeholder="Team Name"
            onChange={(e) => setTeamname(e.target.value)}  
          />
        </div>
        <Button 
          className="bg-blue-500 mt-9 w-[40%] hover:bg-blue-700"
          disabled={!(teamName && teamName.length>0)} 
          onClick={()=>createNewTeam()} 
        >Create Team</Button>
      </div>
    </div>
  )
}

export default CreateTeam