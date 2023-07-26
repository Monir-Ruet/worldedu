"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import cookie from 'js-cookie'
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStore } from "@/zustand/store"
import Login from "./loginpage"
import Link from "next/link"

const logout = () => {
    cookie.remove('auth_token');
    window.open(process.env.backend_url + "/auth/logout", "_self");
};

export default function Useravatar() {
    const { name, email, image, isauthenticated } = useUserStore();
    return (
        <>
            {
                isauthenticated ? (
                    <div className="z-50">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={image} alt="Profile Photo" />
                                    <AvatarFallback>K</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <Link href="/post/write">
                                        <DropdownMenuItem>
                                            Write
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuItem onClick={logout}>
                                    Log Out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                ) : (
                    <div className='hover:cursor-pointer'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={''} alt="Profile Picture" />
                                    <AvatarFallback>K</AvatarFallback>
                                </Avatar>
                            </DialogTrigger>
                            <DialogContent>
                                <Login />
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
        </>

    )
}
