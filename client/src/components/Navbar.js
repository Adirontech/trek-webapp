import profileIcon from '../assets/images/profile-icon.png';

const Navbar = () => {
    return (
        <nav className="relative flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1 font-medium'>
                <a className="mx-4" href="">Home</a>
                <a className="mx-4" href="">About</a>
                <a className="mx-4" href="">Trip Registration</a>
            </div>
            {/* profile - right */}
            <div className="absolute right-0">
                <a href=""><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;