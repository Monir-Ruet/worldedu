"use client"


import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { useState } from 'react'
import { toast, useToast } from '@/hooks/usetoast'
import axiosClient from '@/lib/axiosClient'
import cookie from 'js-cookie'

const google = () => window.open(process.env.backend_url + '/auth/google', '_self')
const github = () => window.open(process.env.backend_url + '/auth/github', '_self')



export default function Login() {
    const router = useRouter()
    const { toast } = useToast();
    const [Signupdata, setSignupdata] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [LoginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    async function Login() {
        if (!LoginData.email || !LoginData.password) return (
            toast({
                description: 'Please provide email and password'
            })
        )
        try {
            const result: any = await axiosClient.post('/login', LoginData)
            if (result && result.data.status == 200) {
                cookie.set("auth_token", result.data.auth_token, {
                    expires: 30 * 24 * 3600,
                })
                window.open("/", "_self");
            } else {
                toast({
                    description: result.data.message
                })
            }
        } catch (err) {
            console.log(err)
            toast({
                description: "Couldn't login to your account"
            })
        }
    }
    async function Signup() {
        if (!Signupdata.email || !Signupdata.password || !Signupdata.name) return (
            toast({
                description: 'Please provide all the credentials.'
            })
        )
        try {
            const result: any = await axiosClient.post('/signup', LoginData)
            if (result) {
                toast({
                    description: result.data.message
                })
            }
        } catch (err) {
            toast({
                description: "Couldn't login to your account"
            })
        }
    }
    return (
        <Tabs defaultValue="login" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline" onClick={google}>
                                <FcGoogle className='mr-2 h-4 w-4' />
                                Google
                            </Button>
                            <Button variant="outline" onClick={github}>
                                <BsGithub className='mr-2 h-4 w-4' />
                                Github
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" onChange={(e: any) => {
                                setLoginData({
                                    ...LoginData, "email": e.target.value
                                })
                            }} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" onChange={(e: any) => {
                                setLoginData({
                                    ...LoginData, "password": e.target.value
                                })
                            }} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={Login} className="w-full">Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline" onClick={google}>
                                <FcGoogle className='mr-2 h-4 w-4' />
                                Google
                            </Button>
                            <Button variant="outline" onClick={github}>
                                <BsGithub className='mr-2 h-4 w-4' />
                                Github
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder='John' onChange={(e: any) => {
                                setSignupdata({
                                    ...Signupdata, "name": e.target.value
                                })
                            }} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder='example@gmail.com' onChange={(e: any) => {
                                setSignupdata({
                                    ...Signupdata, "email": e.target.value
                                })
                            }} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder='*********' onChange={(e: any) => {
                                setSignupdata({
                                    ...Signupdata, "password": e.target.value
                                })
                            }} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={Signup} className="w-full">Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}