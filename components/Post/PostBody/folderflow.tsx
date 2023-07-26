import { BiChevronRight } from 'react-icons/bi'
interface FolderflowProps {
    items: string[]
}
const Folderflow: React.FC<FolderflowProps> = ({
    items
}) => {
    return (
        <div className="w-full flex flex-row items-center">
            {
                items.map((item, index) => {
                    return (
                        <li key={item} className="list-none flex justify-center items-center mr-2">
                            <span className='mr-2'>{item}</span>
                            <span>
                                {
                                    index != items.length - 1 ? <BiChevronRight size={20} /> : ''
                                }
                            </span>
                        </li>
                    )
                })
            }
        </div >
    )
}

export default Folderflow;