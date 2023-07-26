import Image from "next/image"
import Link from "next/link"

const subjectList = [
  "Node",
  "Php",
  "React",
  "Vue",
  "Linux",
  "Python",
  "HTML",
  "Java",
  "Go",
  "Csharp",
  "Kotlin",
  "Csharp",
  "Cpp",
]

export default function Home() {

  return (
    <div className="container mt-5">
      <div className=" md:flex md:flex-row md:justify-between items-center">
        <div className="flex flex-col w-full md:w-5/12">
          <h1 className="text-2xl md:text-4xl font-extrabold">Learn programming<br />for Free</h1>
          <p>Learn to program with our beginner-friendly tutorials and examples. <span className="text-blue-600">Read tutorials, try
            examples, write code</span> and learn to program.
          </p>
        </div>
        <div className="w-full md:w-7/12 flex justify-center">
          <Image title="Learn to code with Programiz" priority={true} width="475" height={475} alt="Learn to code with edulab" src="/art.png" />
        </div>
      </div>



      <div className="mt-10 block md:flex md:justify-between justify-center items-center">
        <div className="items-start">
          <div className="d-flex flex-column justify-content-center">
            <h2 className="text-xl md:text-2xl  font-bold">Choose what to learn</h2>
            <p>Start learning the best programming languages.</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 lg:grid-cols-4" >
          {
            subjectList.map((value, index) => {
              return (
                <Link href={"/post/" + value.replace(/\s/g, '-').toLowerCase()} key={value}>
                  <div className="flex flex-row items-center p-2 border-2">
                    <Image src={"/" + value.toLowerCase() + ".svg"} width={40} height={40} alt="python" />
                    <h3>{value}</h3>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}