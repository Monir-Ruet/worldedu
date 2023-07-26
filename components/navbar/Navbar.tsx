import { ThemeToggle } from '@/components/navbar/themetoggle'
import Searchbar from './searchbar'
import Useravatar from './useravatar'
import Link from 'next/link'
import axiosServer from '@/lib/axiosServer'
import { BiLogoMicrosoft } from 'react-icons/bi'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavLinkList = [
    'Data Structure & Algorithms',
    'CPP',
    'Csharp',
    'Python',
    'Go',
    'Java',
    'Node',
    'Php',
]

const Navbar = async () => {
    let subject: any = []
    try {
        subject = await (await axiosServer.get('/posts/subjects?chapter=false')).data
    } catch (err) {
        subject = []
    }
    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                        <span className="hidden font-bold sm:inline-block">Edulab</span>
                    </a>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div>
                            {/* <span className="sr-only">Toggle Menu</span> */}
                            <div className='rounded flex flex-row justify-center items-center hover:bg-slate-200 dark:hover:bg-zinc-800 p-2'>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden"><path d="M8 2H13.5C13.7761 2 14 2.22386 14 2.5V12.5C14 12.7761 13.7761 13 13.5 13H8V2ZM7 2H1.5C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H7V2ZM0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                <BiLogoMicrosoft size={20} className='hidden md:block' />
                                <span className='ml-2 hidden md:block'>Learn</span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {
                                NavLinkList.map((value, index) => {
                                    const url = value.replace(/\s/g, '-').toLowerCase();
                                    return (
                                        <Link href={"/post/" + url + "/default"} key={index}>
                                            <DropdownMenuItem>
                                                {value}
                                            </DropdownMenuItem>

                                        </Link>
                                    )
                                })
                            }
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-5 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:R15hja:" data-state="closed">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8 2H13.5C13.7761 2 14 2.22386 14 2.5V12.5C14 12.7761 13.7761 13 13.5 13H8V2ZM7 2H1.5C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H7V2ZM0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Toggle Menu</span>
                </button> */}



                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <Searchbar />
                    <div className='hover:cursor-pointer'>
                        <ThemeToggle />
                    </div>
                    <div className='hover:cursor-pointer'>
                        <Useravatar />
                    </div>
                </div>

            </div>
        </header >
    )
}
export default Navbar;



