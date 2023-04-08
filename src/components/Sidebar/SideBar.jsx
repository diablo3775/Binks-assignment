import React from 'react'
import SideBarRow from './SideBarRow'
import { useUserAuth } from '../../context/UserAuthContext'
import { ShoppingCartIcon} from "@heroicons/react/outline"
import { CalendarIcon,ClockIcon, DesktopComputerIcon, UserGroupIcon, UserIcon, UsersIcon} from "@heroicons/react/solid"

const SideBar = () => {
  const {user} = useUserAuth();
  
  return (
    <div className='p-2 mt-5 max-w-[600px] xl:min-w-[300px]'>
        <SideBarRow Icon={UserIcon} title={user.email} />
        <SideBarRow Icon={UsersIcon} title="Friends" />
        <SideBarRow Icon={UserGroupIcon} title="Groups" />
        <SideBarRow Icon={ShoppingCartIcon} title="MarketPlace" />
        <SideBarRow Icon={DesktopComputerIcon} title="Watch" />
        <SideBarRow Icon={CalendarIcon} title="Events" />
        <SideBarRow Icon={ClockIcon} title="Memories" />
    </div>
  )
}

export default SideBar