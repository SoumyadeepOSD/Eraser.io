import { Button } from '@/components/ui/button'
import { Archive, Bell, Github, Plus, PlusCircle } from 'lucide-react'
import React, { useContext, useState } from 'react'
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
import Constant from '@/app/_constant/Constant'
import PricingDialog from './PricingDialog'
import ArchiveDialog from './ArchiveDialog'
import { FileListContext } from '@/app/_context/FileListContext'



const SideNavBottomSection = ({ fileList_ ,onFileCreate, totalFiles }: any) => {
  const menuList = [
    {
      id: 1,
      name: 'Notification',
      icon: Bell,
      path: ''
    },
    {
      id: 3,
      name: 'Archive',
      icon: Archive,
      path: ''
    },
  ]

  const [isArchiveSheetOpen, setIsArchiveSheetOpen] = useState(false);
  const [fileInput, setFileInput] = useState('');

  return (
    <div>
      {menuList.map((item, index) => (
        <div key={index} className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer">
          {item.id === 3 ? (
            <div onClick={() => setIsArchiveSheetOpen(true)} className="flex flex-row">
              <item.icon className="h-5 w-5" />
              {item?.name}
            </div>
          ) : (
            <h2 className="flex flex-row">
              <item.icon className="h-5 w-5" />
              {item?.name}
            </h2>
          )}
        </div>
      ))}

      <Dialog open={isArchiveSheetOpen} onOpenChange={setIsArchiveSheetOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Archive Files</DialogTitle>
            <DialogDescription>
              {/* Content of Archive */}
              <ArchiveDialog/>
               {/* Content of Archive */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-3 flex flex-row items-center justify-center gap-2">
            <h1>New File</h1>
            <PlusCircle/>
          </Button>
        </DialogTrigger>
        {totalFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                <Input placeholder="Enter file name" onChange={(e) => setFileInput(e.target.value)} />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!(fileInput && fileInput.length > 0)}
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDialog />
        )}
      </Dialog>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-3">
        <div
          style={{ width: `${totalFiles * 20}%` }}
          className="h-4 bg-blue-600 rounded-full"
        ></div>
      </div>

      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE}</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">Upgrade your plan for unlimited access</h2>
    </div>
  )
}

export default SideNavBottomSection
