import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const WorkSpaceHeader = ({onSave}:any) => {
    return (
        <div className="p-3 border-b flex justify-between items-center">
            <div className="flex gap-2">
                <Image src="/logo-1.png" alt="logo" width={40} height={40} />
                <h2>File Name</h2>
            </div>
            <div className="flex items-center gap-4">
                <Button className="h-8 text-[12px] gap-2 bg-yellow-600 hover:bg-yellow-700" onClick={()=>onSave()}>
                    <Save className="h-4 w-4"/>
                    Save
                </Button>
                <Button className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700">
                    Share
                    <Link className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default WorkSpaceHeader