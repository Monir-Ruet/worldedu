import axiosServer from "@/lib/axiosServer"
import { MDXRemote } from "next-mdx-remote/rsc"
export default async function Home() {
  let x: any
  try {
    const data = await axiosServer.get('/posts/data-structure-&-algorithms/default')
    x = data.data;
    x = x[1].body
  } catch (err) {
  }
  return (
    <div className="prose">

      <MDXRemote source={x}></MDXRemote>
    </div>
  )
}