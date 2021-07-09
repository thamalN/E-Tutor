import slide from './Resources/slide1.jpg';

const Home = () => {
    return (

        <div>
            <div className="relative">
            <img src={slide} alt="slide1" width="100%"/>
            <div className="absolute1">
                Modern Day Education
            </div>
            <div className="absolute2">
                Join Today For An Immense Experience
            </div>
        </div>
        
        <div className="relative">
            <img src={slide} alt="slide1" width="100%"/>
            <div className="absolute1">
                Modern Day Education
            </div>
            <div className="absolute2">
                Join Today For An Immense Experience
            </div>
        </div>
</div>

    );
}

export default Home;
