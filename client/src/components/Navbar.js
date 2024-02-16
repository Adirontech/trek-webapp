/**
 * Navbar.js - Component for the navigation bar.
 * This component renders a navigation bar with links to Home, About, and Trip Registration.
 * It also includes a profile icon on the right side.
 */

 import profileIcon from '../assets/images/profile-icon.png'; // Importing profile icon image

 /**
  * Functional component representing the navigation bar.
  * @returns JSX Element
  */
 const Navbar = () => {
     return (
         <nav className="flex justify-between items-center">
             {/* Main navigation links centered */}
             <div className='text-center text-xl text-white flex-1 font-medium'>
                 <a className="mr-8" href="">Home</a>
                 <a className="mr-8" href="">About</a>
                 <a href="">Trip Registration</a>
             </div>
             {/* Profile icon on the right */}
             <div className=''>
                 <a href=""><img src={profileIcon} height={40} width={40} alt="Profile Icon"/></a>
             </div>
         </nav>
     )
 }
 
 export default Navbar; // Exporting the Navbar component
 