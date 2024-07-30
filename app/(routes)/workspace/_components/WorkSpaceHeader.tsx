import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const WorkSpaceHeader = ({onSave, fileData}:any) => {
    return (
        <div className="p-3 border-b flex justify-between items-center">
            <div className="flex gap-2">
                <Image src="/logo-1.png" alt="logo" width={40} height={40} />
                <h2>{fileData&&fileData.fileName}</h2>
            </div>
            <div className="flex items-center gap-4">
                <h2>
                    {fileData&&fileData.createdBy}
                    <span className="font-medium text-sm text-green-500 border-2 border-green-500 px-1 py-1 rounded-lg">
                        Owner
                    </span>
                </h2>
                <Button className="h-8 text-[12px] gap-2 bg-yellow-600 hover:bg-yellow-700" onClick={()=>onSave()}>
                    <Save className="h-4 w-4"/>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default WorkSpaceHeader