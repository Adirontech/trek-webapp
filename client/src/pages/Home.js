import '../assets/stylesheets/App.css';
import Button from '../components/Button';

const Home = () => {
    return (
        <div className="hero">
            <div className='title'>
                Adirondack Mountains
            </div>
            <div className='subtitle'>
                T.R.E.K.
            </div>

            <Button text="Get Started" />
        </div>
    )
}

export default Home;