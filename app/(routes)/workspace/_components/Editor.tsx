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

function Editor() {
    const rawDocument = {
        "time":2234356646,
        "blocks": [{
            data:{
                text: "Hello World!",
                level:2
            },
            id: "123",
            type:"header"
        },
        {
            data:{
                level:4
            },
            id: "1234",
            type:"header"
        }
    ],
        "version": "2.5.1"
    }
    const ref = useRef<EditorJS>();
    const [document, setDocument] = useState(rawDocument);
    const initEditor=()=>{
        const editor = new EditorJS({
            tools: {
                header: {
                    class: Header,
                    shortcut: "CMD+SHIFT+H",
                    config: {
                        placeholder: "Enter a header"
                    }
                },
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
            data: document
        });
        ref.current = editor;
    }
    useEffect(()=>{
        initEditor();
    },[]);

        return (
        <div>
            <div id='editorjs'></div>
        </div>
    )
}

export default Editor