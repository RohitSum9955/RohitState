import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Header() {
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                {/* add link tag import from react-router -dom for without refreshing the page  go to another page */}
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Rohit</span>
                        <span className='text-slate-700'>Esate</span>
                    </h1>
                </Link>
                {/* add form for our input */}
                {/* adding class name under from tag for search bar color set and set the icon from react icon before this we installed a package npm i react-icon*/}
                {/* after installed react-icon first we can import  */}
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    {/* remove backgroud color and transparent */}
                    {/* add focus-outline remove serach bar boudary */}
                    <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                {/* after form comes our menu */}
                <ul className=' flex gap-4'>
                    {/* for adding small screen we can see in the form of inline add hover effect just change add the under line */}
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='text-slate-700 hover:underline'>{' '}Sign in</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}
