/**
 * Home.js - Component for the home page.
 * This component renders the home page, including a navigation bar and a hero section with a background image.
 */

 import '../assets/stylesheets/App.css'; // Importing the CSS file for styling
 import Navbar from '../components/Navbar'; // Importing the Navbar component for navigation
 
 
 import { useNavigate } from 'react-router-dom';
 
 /**
  * Functional component representing the home page.
  * @returns {JSX.Element} - JSX element representing the home page.
  */
 const Home = () => {

    const navigate = useNavigate();


    const navigateToLogin = () => {

        const findSessionKey = sessionStorage.getItem('sessionKey');

        if(findSessionKey){
            navigate('/register')
        }
        else{
             navigate('/login');

        }
    }






     return (
         <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
             {/* Rendering the navigation bar */}
             <Navbar />
             <div className='flex flex-col items-center justify-center h-full'>
                 {/* Title for the home page */}
                 <div className='text-5xl text-white font-semibold'>
                     Adirondack Mountains
                 </div>
                 {/* Subtitle for the home page */}
                 <div className='text-9xl text-white font-bold'>
                     T.R.E.K.
                 </div>
                 {/* Button to get started */}
                 <button className="text-white text-2xl font-bold py-2 px-4 border border-black rounded bg-green mt-20" onClick={navigateToLogin}>
                     Get Started
                 </button>
             </div>
         </div>
     );
 }
 
 export default Home;
 