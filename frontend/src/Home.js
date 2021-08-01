import slide1 from './Resources/slide1.jpg';
import slide2 from './Resources/slide2.jpg';
import slide3 from './Resources/slide3.jpg';
import slide4 from './Resources/slide4.png';
import slide5 from './Resources/slide5.png';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PaymentIcon from '@material-ui/icons/Payment';
import ExtensionIcon from '@material-ui/icons/Extension';

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
                        <LocalLibraryIcon />
                        <p className="h3">Full Course Materials</p>
                    </div>
                    <div className="absolute4">
                        <VerifiedUserIcon />
                        <p className="h3">Certified Teachers</p>
                    </div>
                    <div className="absolute5">
                        <PaymentIcon />
                        <p className="h3">Online Payments</p>
                    </div>
                    <div className="absolute6">
                        <ExtensionIcon />
                        <p className="h3">Creative Lessons</p>
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
                        eTutor brings you the best online education experience
                        to your finger tips by collaborating with
                        leading teachers and lecturers in the country.
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
                        With all the knowledge provided, our students can
                        stay ahead of the competition with ease.
                    </h1>
                </div>
            </div>
            <div className="relative">
                <img src={slide4} alt="slide4" width="100%" />
                <div className="absolute21" >
                    Top-Stars
                </div>
                <div className="absolute22">
                    Our course content is created by a well-recognized academic staff, which  guarantees the accuracy of the content.
                </div>
            </div>
            <div className="relative2">
                <div className="absolute31">
                    <div>
                        <h1 className="center5">69</h1>
                    </div>
                    <div className="p2">
                        Certified Teachers
                    </div>
                </div>
                <div className="absolute32">
                    <div>
                        <h1 className="center5">2500</h1>
                    </div>
                    <div className="p2">
                        Students
                    </div>
                </div>
                <div className="absolute33">
                    <div>
                        <h1 className="center5">48</h1>
                    </div>
                    <div className="p2">
                        Subjects
                    </div>
                </div>
                <div className="absolute34">
                    <div>
                        <h1 className="center5">225</h1>
                    </div>
                    <div className="p2">
                        Courses
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src={slide5} alt="slide5" width="100%" />
                <div className="absolute21">
                    Non-Academic Activities
                </div>
                <div className="absolute22">
                    Here in E-Tutor, we offer a variety of extra activities apart from the academic activities to improve the educational environment of the students..
                </div>
            </div>
            <div className="relative4">
                <div className="absolute41">
                    <h1 className="center6">Top Courses</h1>
                </div>
                <div className="absolute41">
                    <h1 className="center7">
                        There are different varieties of courses available. Courses serve a multitude of purposes for different students: they are sometimes used to bridge the gap between different phases of academic study.
                    </h1>
                </div>
            </div>
            <div className="relative5">

            </div>
        </div >
    );
}

export default Home;
