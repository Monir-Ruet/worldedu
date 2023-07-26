"use client"

import * as React from "react"
import Link from "next/link"

interface SidebarProps {
    posttitle: string,
    subject: {
        name: string,
        post: {
            title: string,
            titleId: string,
            priority: number
        }[]
    }
    className?: string
}
const Sidebar: React.FC<SidebarProps> = ({
    subject,
    posttitle,
    className
}) => {
    const post = subject.post
    return (
        <div className={className}>
            <h1 className="truncate">{subject.name}</h1>
            <ul className="list-none pl-[30px] mt-[2px] w-full flex flex-col justify-end text-ellipsis">
                {
                    post.map((list, index) => {
                        return (
                            <li className="flex pl-0 hover:text-blue-200 flex-col justify-center relative w-full mb-0" key={index}>
                                <Link href={list.titleId} className={(list.title == posttitle ? "underline text-blue-500" : "text-foreground ") + " font-light font-serif text-base truncate "}>
                                    {list.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}





export default Sidebar