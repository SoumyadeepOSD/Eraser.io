import { ArchiveRestore, Trash2 } from 'lucide-react';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { FileListContext } from '@/app/_context/FileListContext';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

const ArchiveDialog = () => {
  const { fileList_, setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    if (fileList_) {
      setFileList_(fileList_);
    }
  }, [fileList_, setFileList_]);

  const updateFile = useMutation(api.files.updateFile);
  const deleteFile = useMutation(api.files.deleteFile);

  const deleteFiles = async (id: any, fileName: string) => {
    try {
      await deleteFile({ _id: id });
      toast.success(`File ${fileName} has been deleted successfully`);
      // Update the local state
      const updatedFileList = fileList_?.filter((file: any) => file._id !== id);
      setFileList_(updatedFileList);
    } catch (e: any) {
      toast.error(`Failed to delete file ${fileName} due to error: ${e.message}`);
    }
  };

  const restoreArchive = async (id: any, fileName: string) => {
    const updatedFileList = fileList_?.map((file: any) => 
      file._id === id ? { ...file, archive: false } : file
    );
    setFileList_(updatedFileList);

    try {
      await updateFile({ _id: id, archive: false });
      toast.success(`File ${fileName} has been restored successfully`);
    } catch {
      const rollbackFileList = fileList_?.map((file: any) =>
        file._id === id ? { ...file, archive: true } : file
      );
      setFileList_(rollbackFileList);
      toast.error(`Failed to restore file ${fileName}`);
    }
  };

  return (
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {fileList_?.map((file: any, index: any) => file.archive && (
          <tr key={file._id} className="odd:bg-gray-50">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format("DD/MM/YYYY")}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format("DD/MM/YYYY")}</td>
            <td className="flex items-center justify-evenly">
              <Trash2 color='red' className="hover:cursor-pointer" onClick={() => deleteFiles(file._id, file.fileName)} />
              <ArchiveRestore color='green' className="hover:cursor-pointer" onClick={() => restoreArchive(file._id, file.fileName)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArchiveDialog;
