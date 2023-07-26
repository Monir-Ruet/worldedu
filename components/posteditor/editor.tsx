"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MDEditor from '@uiw/react-md-editor';
import { useTheme } from "next-themes";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { useEditorStore } from '@/zustand/store'
import { Input } from "../ui/input";
import { useEffect } from "react";


const Editor = () => {
    const theme = useTheme()
    const { editorText, title } = useEditorStore()

    useEffect(() => {
        let data: any = localStorage.getItem("localdata")
        if (data) {
            data = JSON.parse(data);
            useEditorStore.setState({ editorText: data.data, title: data.title });
        }
    }, [])

    function handleKeydown(event: any) {
        if (event.key == 'Tab') {
            event.preventDefault();
            var start = event.target.selectionStart;
            var end = event.target.selectionEnd;
            event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 1;
        }
    }



    return (
        <Tabs defaultValue="edit" className="my-2">
            <TabsList className="grid grid-cols-2 w-64 mx-auto my-0 rounded-none rounded-t">
                <TabsTrigger value="edit">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="my-0">
                <Input value={useEditorStore.getState().title} type="text" placeholder="Title" onChange={(e: any) =>
                    useEditorStore.setState({ title: e.target.value })
                } />
                <textarea value={editorText} onKeyDown={handleKeydown} className="w-full m-0 h-[700px] bg-[#ccc] border-1 dark:bg-[#27272A]  p-2 focus:outline-none rounded-lg" onChange={(e: any) => {
                    useEditorStore.setState({ editorText: e.target.value });
                }} />
            </TabsContent>
            <TabsContent value="preview" className="h-fit">
                <div data-color-mode={theme.theme}>
                    <div className="wmde-markdown-var">
                        <h1 className="text-bold text-3xl">
                            {
                                useEditorStore.getState().title
                            }
                        </h1>
                    </div>
                    <MDEditor.Markdown className="dark:bg-background" source={editorText} rehypePlugins={[rehypeKatex]} remarkPlugins={
                        [remarkGfm, remarkMath]
                    } />
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default Editor;