"use client"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
    Card, CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useToast } from "@/hooks/usetoast"
import React, { useState } from "react"
import { LuX } from "react-icons/lu"
import { useEditorStore } from "@/zustand/store"
import axiosClient from "@/lib/axiosClient"
import { Input } from "../ui/input"

interface EditorcontrollerProps {
    data: {
        name: string,
        chapter: {
            name: string
        }[]
    }[]
}

const Editorcontroller: React.FC<EditorcontrollerProps> = (
    data
) => {
    const { toast } = useToast();
    const [subjectName, setsubjectName] = useState('')
    const [tags, settags] = useState<string[]>([]);

    const addPost = async () => {
        try {
            let body = useEditorStore.getState().editorText, subject = subjectName, title = useEditorStore.getState().title
            if (body.length < 10) throw new Error("Document Length too small.");
            else if (!title.length) throw new Error("Please provide a title");
            else if (!subjectName) throw new Error("Please provide a subject.");
            const result = await axiosClient.post('/posts/add', {
                title,
                body,
                subject,
                tags
            })
            if (result.data.status != 200) {
                toast({
                    description: "There is another post with this title."
                })
            } else {
                toast({
                    description: result.data.message
                })
            }
        }
        catch (err: any) {
            toast({
                description: err.message,
            })
        }
    }

    function saveToLocalStorage() {
        let data = {
            "data": useEditorStore.getState().editorText,
            "title": useEditorStore.getState().title
        }
        localStorage.setItem("localdata", JSON.stringify(data));
        toast({
            description: "Saved to Local"
        })
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-md">Create project</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant={"outline"} className="w-full text-xs" onClick={saveToLocalStorage}>Save</Button>
                    <div className="my-2">
                        Status <Badge variant="secondary">Draft</Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="bg-[#2185D0] text-white w-full text-xs" onClick={addPost}>Submit For Review</Button>
                </CardFooter>
            </Card>
            <Card className="my-2">
                <CardHeader>
                    <CardTitle className="text-md">Subject</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={(value) => {
                        setsubjectName(value);
                    }}>
                        <SelectTrigger className="w-full p-2">
                            <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                data.data.map((value, index) => {
                                    return (
                                        <SelectItem value={value.name} key={index}>{value.name}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <Card className="my-2">
                <CardHeader>
                    <CardTitle className="text-md">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input type="text" onKeyDown={(e: any) => {
                        if (e.key == 'Enter') {
                            settags([...tags, e.target.value]);
                            e.target.value = ''
                        }
                    }} placeholder="Tags" />
                    <div className="mt-2">
                        {
                            tags.map((tag, index) => {
                                return (
                                    <Badge className="m-1" key={index}>
                                        {tag}
                                        <LuX className="ml-2 hover:text-red-500" key={index} onClick={() => {
                                            useEditorStore.setState({
                                                tags: (
                                                    tags.filter((value) => {
                                                        return value != tag;
                                                    }))
                                            })
                                            settags(useEditorStore.getState().tags)
                                        }} />
                                    </Badge>
                                )
                            })
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Editorcontroller