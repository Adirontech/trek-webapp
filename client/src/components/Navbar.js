import profileIcon from '../assets/images/profile-icon.png';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1'>
                <a className="mr-8" href="">Home</a>
                <a className="mr-8" href="">About</a>
                <a href="">Trip Registration</a>
            </div>
            {/* profile - right */}
            <div className=''>
                <a href=""><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;