/**
 * Navbar.js - Component for the navigation bar.
 * This component renders a navigation bar with links to Home, About, and Trip Registration.
 * It also includes a profile icon on the right side.
 */
import profileIcon from '../assets/images/profile-icon.png';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1 font-medium'>
                <a className="mr-8" href="">Home</a>
                <a className="mr-8" href="">About</a>
                <a href="http://localhost:3000/register">Trip Registration</a>
            </div>
            {/* profile - right */}
            <div className=''>
                <a href="http://localhost:3000/profile"><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;