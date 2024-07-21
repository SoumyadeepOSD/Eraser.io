import { FileListContext } from '@/app/_context/FileListContext';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Archive, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {}

interface fileInterface {
  archive: boolean,
  createdBy: string,
  document: string,
  fileName: string,
  teamId: string,
  whiteboard: string,
  _creationTime: string,
  _id: string,
}

const FileList = (props: Props) => {
  const { fileList_, setFileList_, user} = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    fileList_ && setFileList(fileList_); 
  }, [fileList_])

  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {
              fileList && fileList.map((file: fileInterface, index: number) => (
                <tr 
                  key={index} 
                  className="odd:bg-gray-50 hover:cursor-pointer" 
                  onClick={()=>{router.push(`/workspace/${file._id}`)}}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format("DD/MM/YYYY")}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format("DD/MM/YYYY")}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Image src={user?.picture} alt="profile" width={30} height={30} className="rounded-full" />
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="hover:cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="gap-3">
                          <Archive className="h-4 w-4"/>
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileList