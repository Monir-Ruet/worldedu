import Link from 'next/link'

function Footer() {
    return (
        <div className='flex flex-row w-full container justify-between items-center pt-5 pb-5 mt-5  mb-2'>
            <div className='flex items-center'>
                <Link href="/">Edulab </Link>
                <span>&copy; 2023 creativeLabs.</span>
            </div>
            <div>
                <span>Powered by</span>
                <Link href="/">Edulab</Link>
            </div>
        </div>
    )
}

export default Footer