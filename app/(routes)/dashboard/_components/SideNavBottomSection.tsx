import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'


type Props = {
  onFileCreate: () => void
}

const SideNavBottomSection = ({onFileCreate}: any) => {
  const menuList = [
    {
      id: 1,
      name: 'Flag',
      icon: Flag,
      path: ''
    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: ''
    },
    {
      id: 3,
      name: 'Archive',
      icon: Archive,
      path: ''
    },

  ]
  const [fileInput, setFileInput] = useState('');
  return (
    <div>
      {menuList.map((item, index) => (
        <h2
          key={index}
          className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer"
        >
          <item.icon className="h-5 w-5" />
          {item?.name}
        </h2>
      ))}


      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start mt-3">
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input placeholder="Enter file name" onChange={(e)=>setFileInput(e.target.value)}/>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
          <DialogClose asChild>
            <Button 
              type="button" 
              className="bg-blue-600 hover:bg-blue-700" 
              disabled={!(fileInput&&fileInput.length>0)}
              onClick={()=>onFileCreate(fileInput)}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>




      {/* Progress Bar */}
      <div
        className=" h-4 w-full bg-gray-200 rounded-full mt-3"
      >
        <div className="h-4 w-[40%] bg-blue-600 rounded-full"></div>
      </div>


      <h2 className="text-[12px] mt-3">
        <strong>1</strong> out of <strong>5</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">Upgrade your plan for unlimited access</h2>
    </div>
  )
}

export default SideNavBottomSection