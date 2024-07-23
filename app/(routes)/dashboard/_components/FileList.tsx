import { FileListContext } from '@/app/_context/FileListContext';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, ExternalLink, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

type Props = {}

export interface fileInterface {
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
  const { fileList_, setFileList_, user } = useContext(FileListContext);
  const [fileList, setFileList] = useState<fileInterface[]>(fileList_ || []);
  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  const updateFile = useMutation(api.files.updateFile);

  const sendArchive = async (id: any, fileName: string) => {
    const updatedFileList = fileList.map(file =>
      file._id === id ? { ...file, archive: true } : file
    );
    setFileList(updatedFileList);
    setFileList_(updatedFileList);

    try {
      await updateFile({ _id: id, archive: true });
      toast.success(`File ${fileName} archived successfully`);
    } catch {
      const rollbackFileList = fileList.map(file =>
        file._id === id ? { ...file, archive: false } : file
      );
      setFileList(rollbackFileList);
      setFileList_(rollbackFileList);
      toast.error(`Failed to archive file ${fileName}`);
    }
  };

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
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fileList.map((file: fileInterface, index: number) => {
              if (!file.archive) {
                return (
                  <tr key={file._id} className="odd:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format("DD/MM/YYYY")}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format("DD/MM/YYYY")}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <Image src={user?.picture || '/default-avatar.png'} alt="profile" width={30} height={30} className="rounded-full" />
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal className="hover:cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="gap-3" onClick={() => sendArchive(file._id, file.fileName)}>
                            <Archive className="h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td>
                      <ExternalLink
                        className="hover:cursor-pointer"
                        onClick={() => router.push(`/workspace/${file._id}`)}
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
