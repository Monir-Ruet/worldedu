import axiosClient from "@/lib/axiosServer";
import Image from "next/image";
import Sidebar from "@/components/Post/Postsidebar/Sidebar"
import Postbody from "@/components/Post/PostBody/Postbody"
import { Suspense } from 'react'
import { LoadingSpinner } from "@/components/Elements/LoadingSpinner";


interface postId {
    subject: string,
    postid: string;
}
interface post {
}
async function Post({ params }: { params: postId }) {
    const selectedPost = await (await axiosClient.get(`posts/${params.subject}/${params.postid}`)).data
    if (selectedPost && selectedPost[1] == null) {
        return (
            <div className="text-center flex justify-center mt-10">
                <div className="absolute mx-auto">
                    <div className="notFound-img flex justify-center">
                        <Image src="/Illustration.svg" alt="404-error-image" width={200} height={200} />
                    </div>
                    <div className="text-center">
                        <h2>Whoops, that page is gone.</h2>
                        <p>While you&apos;r here, feast your eyes upon these popular</p>
                        <p>recommendations for you.</p>
                    </div>
                </div>
            </div>
        )
    }
    const data = selectedPost[1];
    const subject = data.subject;
    return (
        <div className="container flex flex-col justify-between md:flex-row">
            <Sidebar posttitle={selectedPost[1].title} subject={subject} className="w-12/12 md:w-3/12 lg:w-2/12 mt-4 mr-4" />
            <Suspense fallback={<LoadingSpinner className="w-10 h-10 absolute left-1/2 top-1/2" />}>
                <Postbody body={selectedPost[1].body} className="w-full md:w-9/12 lg:w-10/12 mt-4 mx-4" title={selectedPost[1].title} />
            </Suspense>
            {/* <div className="w-2/12 mt-4 ml-4 hidden lg:block">
                Right
            </div> */}
        </div>
    )
}

export default Post