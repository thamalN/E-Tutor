import slide1 from './Resources/slide1.jpg';
import slide2 from './Resources/slide2.jpg';
import slide3 from './Resources/slide3.jpg';
import slide4 from './Resources/slide4.png';
import slide5 from './Resources/slide5.png';

import './Resources/styles.css'
import './Resources/home.css'

const Home = () => {
    return (

        <div>
            <div className="relative">
                <img src={slide1} alt="slide1" width="100%" />
                <div className="absolute1">
                    Modern Day Education
                </div>
                <div className="absolute2">
                    Join Today For An Immense Experience
                </div>
                
                <div className="options1">
                    <div className="absolute3">
                        <i className="bi bi-book-half"></i>
                        <p className="p1">Full Course Materials</p>
                    </div>
                    <div className="absolute4">
                        <i className="bi bi-book-half"></i>
                        <p className="p1">Certified Teachers</p>
                    </div>
                    <div className="absolute5">
                        <i className="bi bi-book-half"></i>
                        <p className="p1">Online Payments</p>
                    </div>
                    <div className="absolute6">
                        <i className="bi bi-book-half"></i>
                        <p className="p1">Creative Lessons</p>
                    </div>
                </div>
            </div>



            <div className="relative2">
                <img src={slide2} alt="slide2" width="100%" />
            </div>
            <div className="relative2">
                <div className="absolute11">
                    <p>The</p>
                    <h1 className="center">Best Panel</h1>
                </div>
                <div className="absolute12">
                    <h1 className="center2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim ultrices neque ullamcorper malesuada. Duis scelerisque tristique molestie. Nam viverra ornare magna,
                    </h1>
                </div>
            </div>
            <div className="relative3">
                <img src={slide3} alt="slide3" width="100%" />
            </div>
            <div className="relative2">
                <div className="absolute13">
                    <h1 className="center3">Stay Ahead, Always</h1>
                </div>
                <div className="absolute14">
                    <h1 className="center4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim ultrices neque ullamcorper malesuada. Duis scelerisque tristique molestie. Nam viverra ornare magna,
                    </h1>
                </div>
            </div>
            <div className="relative">
                <img src={slide4} alt="slide4" width="100%" />
                <div className="absolute21">
                    Stay Ahead
                </div>
                <div className="absolute22">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim ultrices neque ullamcorper malesuada. Duis scelerisque tristique molestie. Nam viverra ornare magna,
                </div>
            </div>
            <div className="relative2">
                <div className="absolute31">
                    <div>
                        <h1 className="center5">69</h1>
                    </div>
                    <div className="p1">
                        Certified Teachers
                    </div>
                </div>
                <div className="absolute32">
                    <div>
                        <h1 className="center5">2500</h1>
                    </div>
                    <div className="p1">
                        Students
                    </div>
                </div>
                <div className="absolute33">
                    <div>
                        <h1 className="center5">48</h1>
                    </div>
                    <div className="p1">
                        Subjects
                    </div>
                </div>
                <div className="absolute34">
                    <div>
                        <h1 className="center5">225</h1>
                    </div>
                    <div className="p1">
                        Courses
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={slide5} alt="slide5" width="100%" />
                <div className="absolute21">
                    Lorem Ip.
                </div>
                <div className="absolute22">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim ultrices neque ullamcorper malesuada. Duis scelerisque tristique molestie. Nam viverra ornare magna,
                </div>
            </div>
            <div className="relative4">
                <div className="absolute41">
                    <h1 className="center6">Top Courses</h1>
                </div>
                <div className="absolute41">
                    <h1 className="center7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim ultrices neque ullamcorper malesuada. Duis scelerisque tristique molestie. Nam viverra ornare magna,
                    </h1>
                </div>
            </div>
            <div className="relative5">

            </div>
        </div >
    );
}

export default Home;
