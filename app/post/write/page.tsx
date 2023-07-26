"use client"
import Editor from '@/components/posteditor/editor'
import Editorcontroller from '@/components/posteditor/editorcontroller'
import axiosClient from '@/lib/axiosClient'
import { useEffect, useState } from 'react'
function Write() {

    const [data, setdata] = useState([])
    useEffect(() => {
        axiosClient.get('/posts/subjects')
            .then((res) => {
                setdata(res.data)
            })
    }, [])
    return (
        <div className='md:container flex flex-row justify-between'>
            <div className='w-full md:w-8/12 lg:w-9/12 m-2'>
                <Editor />
            </div>
            <div className='hidden md:block md:w-4/12 lg:w-3/12 mt-14'>
                <Editorcontroller data={data} />
            </div>
        </div>
    )
}

export default Write