// FileList.tsx
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

export interface fileInterface {
  archive: boolean,
  createdBy: string,
  document: string,
  fileName: string,
  teamId: string,
  whiteboard: string,
  _creationTime: string,
  _id: any,
}

const FileList: React.FC = () => {
  const { fileList_, setFileList_, user } = useContext(FileListContext);
  const [fileList, setFileList] = useState<fileInterface[]>(fileList_ || []);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const router = useRouter();

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
      setIsLoading(false);
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

  const filteredFileList = fileList.filter(file => 
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading files...</div>; // Show loading state
  }

  return (
    <div className="mt-10">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="overflow-x-auto">
        {filteredFileList.length === 0 ? (
          <div className="p-4 text-center text-gray-600">File not found</div>
        ) : (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Link</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFileList.map((file) => (
                !file.archive && (
                  <tr key={file._id} className={`odd:bg-gray-50 ${searchQuery && file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ? 'bg-cyan' : ''}`}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
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
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FileList;
