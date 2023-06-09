import HeaderIcon from './HeaderIcon'
import logo from '../../assets/logo.svg'
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../context/UserAuthContext"
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon} from "@heroicons/react/outline"
import { BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon} from "@heroicons/react/solid"

const Header = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/")
        } catch (error) {
          console.log(error.message);
        }
      };
    
  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
        {/* Left */}
        <div className='flex items-center'>
            <img src={logo} width={40} height={40} layout="fixed" />
            <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
                <SearchIcon className="h-6" />
                <input className='hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink' placeholder='Search' />
            </div>
        </div>

        {/* Center */}
        <div className='flex justify-center flex-grow'>
            <div className='flex space-x-6 md:space-x-2'>
                <HeaderIcon active Icon={HomeIcon} />
                <HeaderIcon Icon={FlagIcon} />
                <HeaderIcon Icon={PlayIcon} />
                <HeaderIcon Icon={ShoppingCartIcon} />
                <HeaderIcon Icon={UserGroupIcon} />
            </div>
        </div>

        {/* Right */}
        <div className='flex items-center sm:space-x-7 justify-end'>
            <p className='whitespace-nowrap font-semibold pr-3'>{user.displayName}</p>
            <button className='whitespace-nowrap font-semibold pr-3' variant="primary" onClick={handleLogout}>
        Log out
      </button>
            <ViewGridIcon className='icon' />
            <ChatIcon className='icon' />
            <BellIcon className='icon' />
            <ChevronDownIcon className='icon' />
        </div>
    </div>
  )
}

export default Header