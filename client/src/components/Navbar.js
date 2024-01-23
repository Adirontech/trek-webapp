import profileIcon from '../assets/images/profile-icon.png';

const Navbar = () => {
    const isResourcePlanner = false;

    return (
        <nav className="relative flex justify-between items-center">
            {/* main nav - centered */}
            <div className='text-center text-xl text-white flex-1 font-medium'>
                <a className="mx-4" href="">Home</a>
                <a className="mx-4" href="">About</a>
                <a className="mx-4" href="">Trip Registration</a>
                {/* only show the resource planning page if the user is a resource planner */}
                {isResourcePlanner && <a className="mx-4" href="">Resource Planning</a>}
            </div>
            {/* profile - right */}
            <div className="absolute right-0">
                <a href=""><img src={profileIcon} height={40} width={40}/></a>
            </div>
        </nav>
    )
}

export default Navbar;