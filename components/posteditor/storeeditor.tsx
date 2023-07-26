"use client"

import { useEditorStore, postEditor } from "@/zustand/store"
import { useRef } from "react"
function PostEditorInitializer({
    editorText,
    selectedCategory,
    tags
}: postEditor) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useEditorStore.setState({ editorText, selectedCategory, tags })
        initialized.current = true;
    }
    return null;
}
export default PostEditorInitializer;