"use client";

import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from '@editorjs/checklist';
//@ts-ignore
import SimpleImage from "@editorjs/simple-image";
//@ts-ignore
import Paragraph from '@editorjs/paragraph';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

function Editor({ onSaveTrigger, fileId, fileData }: any) {
    const rawDocument = {
        "time": 2234356646,
        "blocks": [{
            data: {
                text: "Hello World!",
                level: 2
            },
            id: "123",
            type: "header"
        },
        {
            data: {
                level: 4
            },
            id: "1234",
            type: "header"
        }
        ],
        "version": "2.5.1"
    }
    const ref = useRef<EditorJS>();
    const [document, setDocument] = useState(rawDocument);
    const initEditor = () => {
        const editor = new EditorJS({
            tools: {
                header:Header,
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                image: SimpleImage,
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
            },

            holder: 'editorjs',
            data:fileData.document?JSON.parse(fileData?.document):document,
        });
        ref.current = editor;
    }
    useEffect(() => {
        fileData&&initEditor();
    }, [fileData]);

    useEffect(() => {
        console.log("Trigger value", onSaveTrigger);
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger]);

    const updateDocument = useMutation(api.files.updateDocument);

    const onSaveDocument = () => {
        if (ref.current) {
            ref.current.save().then((outputData) => {
                console.log('Article Data', outputData);
                updateDocument({
                    _id: fileId,
                    document: JSON.stringify(outputData),
                }).then((res) => {
                    toast.success("Document saved successfully");
                }, (e) => {
                    toast.error(`Some error ocuured while saving the document ${e}`);
                })
            }).catch((error) => {
                console.log('Saving failed', error);
            });
        }
    }

    return (
        <div>
            <div id='editorjs'></div>
        </div>
    )
}

export default Editor