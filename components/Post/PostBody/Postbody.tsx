import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from 'rehype-highlight'
import axiosClient from "@/lib/axiosServer";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

interface PostBodyProps {
    className?: string,
    body: string,
    title: string
}
const Postbody: React.FC<PostBodyProps> = async ({
    className,
    body,
    title
}) => {
    const data = body;
    const { content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: data,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                rehypePlugins: [
                    rehypeKatex,
                    rehypeHighlight,
                    rehypePrettyCode,
                ],
                remarkPlugins: [
                    remarkMath,
                    remarkGfm
                ],
            },
        },
        components: {
            h1: (props) => {
                return (<h1 className={"m-0 text-dark dark:text-white" + props.className}>{props.children}</h1>)
            },
            pre: (props) => {
                return (
                    <pre className={props.className ? props.className : '' + " bg-[#F6F8FA] dark:bg-[#16181D] overflow-x-auto border-2 rounded"}>{props.children}</pre>
                )
            },
            code: (props) => {
                if (props.className != undefined) {
                    return (
                        <code className={"text-base bg-[#F6F8FA] dark:bg-[#16181D]"}>{props.children}</code>
                    )
                } else {
                    return (
                        <code className="p-1 rounded-md bg-zinc-300 dark:bg-zinc-700">{props.children}</code>
                    )
                }
            },
            p: (props) => {
                return (
                    <p className="m-0">{props.children}</p>
                )
            }

        }
    })

    return (
        <div className={className + "prose prose-base dark:prose-invert"}>
            <h1>{title}</h1>
            {content}
        </div >
    )
}

export default Postbody