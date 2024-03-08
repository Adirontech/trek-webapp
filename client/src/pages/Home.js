/**
 * Home.js - Component for the home page.
 * This component renders the home page, including a navigation bar and a hero section with a background image.
 */

 import '../assets/stylesheets/App.css'; // Importing the CSS file for styling
 import Navbar from '../components/Navbar'; // Importing the Navbar component for navigation
 import POIDataFilter from '../components/POIDataFilter';
 
 
 import { useNavigate } from 'react-router-dom';
 
 /**
  * Functional component representing the home page.
  * @returns {JSX.Element} - JSX element representing the home page.
  */
 const Home = () => {

    const navigate = useNavigate();

    //Navigating to either login or register on the "Get Started Button"
    const navigateToLogin = () => {
        //looks for the session key of a user
        const findSessionKey = sessionStorage.getItem('sessionKey');
        if(findSessionKey){
            //if the session key is found, user is logged in
            //navigates to registration page 
            navigate('/register')
        }
        else{
            //if the session key is not found, user is not logged in 
            //navigates to login page 
             navigate('/login');
        }
    }
     return (
         <div className="h-screen bg-cover bg-home bg-center bg-fixed bg-no-repeat hero p-8">
             {/* Rendering the navigation bar */}
             <Navbar />
             <POIDataFilter />
             {/**
             <div className='flex flex-col items-center justify-center h-full'>
                 <div className='text-5xl text-white font-semibold'>
                     Adirondack Mountains
                 </div>
                 <div className='text-9xl text-white font-bold'>
                     T.R.E.K.
                 </div>
                 {/* Button to get started */
                 /* <button className="text-white text-2xl font-bold py-2 px-4 border border-black rounded bg-green mt-20" onClick={navigateToLogin}>
                     Get Started
                 </button>
             </div> 
            */}
         </div>
     );
 }
 
 export default Home;
 