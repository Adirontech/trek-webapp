import { useContext } from 'react';
import profileIcon from '../assets/images/profile-icon.png';
import MainContext from '../MainContext';

const Navbar = () => {
    const { isLandUsagePlanner } = useContext(MainContext);

    return (
        <nav className="relative flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1 font-medium'>
                <a className="mx-4" href="./">Home</a>
                <a className="mx-4" href="/register">Trip Registration</a>
                {/* only show the land usage planning page if the user is a land usage planner */}
                {isLandUsagePlanner && <a className="mx-4" href="/ranger">Land Usage Planning</a>}
            </div>
            {/* profile - right */}
            <div className="absolute right-0">
                <a href=""><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;
