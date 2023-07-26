"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    CommandDialog
} from "@/components/ui/command"
import axiosClient from "@/lib/axiosClient"
import Link from "next/link"
import { useState, useEffect } from "react"


interface post {
    title: string,
    titleId: string,
    subject: {
        title: string
    }
}

function Searchbar() {
    const [open, setOpen] = useState(false)
    let timeout: any;
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && e.metaKey) {
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const [post, setpost] = useState<post[]>([])
    return (
        <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="w-full flex-1 md:w-auto md:flex-none" onClick={() => {
                setOpen(!open)
            }}>
                <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                    <span className="hidden lg:inline-flex">Search documentation...</span>
                    <span className="inline-flex lg:hidden">Search...</span>
                    <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>
                        K
                    </kbd>
                </button>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search..." onKeyUp={(e: any) => {
                    if (timeout) { clearTimeout(timeout) }
                    timeout =
                        setTimeout(async () => {
                            const result = await axiosClient.get(`/posts/search?keyword=` + e.target.value)
                            if (result)
                                setpost(result.data)
                        }, 500)
                }} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {
                        post.length ? (<CommandGroup heading="Search Results">
                            {
                                post.map((item, index) => {
                                    return (
                                        <Link key={index} href={`post/${item.subject.title}/${item.titleId}`} onClick={() => {
                                            setOpen(!open)
                                        }}><CommandItem>{item.title}</CommandItem></Link>
                                    )
                                })
                            }

                        </CommandGroup>
                        ) : ('')
                    }
                </CommandList>
            </CommandDialog>
        </div>

    )
}

export default Searchbar