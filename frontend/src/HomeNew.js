import slide1 from './Resources/slide1.jpg';
import slide2 from './Resources/slide2.jpg';
import slide3 from './Resources/slide3.jpg';
import slide4 from './Resources/slide4.png';
import slide5 from './Resources/slide5.png';
import chemistry from './Resources/Chemistry.jpg';
import physics from './Resources/Physics.jpg';
import mathematics from './Resources/Mathematics.jpg';
import biology from './Resources/Biology.jpg';
import { Icon, InlineIcon } from '@iconify/react';
import bxBookReader from '@iconify-icons/bx/bx-book-reader';
import certificate24Regular from '@iconify-icons/fluent/certificate-24-regular';
import payment16Regular from '@iconify-icons/fluent/payment-16-regular';
import puzzleEditOutline from '@iconify-icons/mdi/puzzle-edit-outline';
import './sandbox.js';



import './Resources/HomeNew.css'

const HomeNew = () => {
    return (
        <main>
            <section className="banner">
                <img src={slide1} alt="slide1" width="100%" />
                <div className="modern">
                    <h1>Modern Day<br />Education</h1>
                    <p>Join Today For An Immense Experience</p>
                </div>
                <div className="features-list">
                    <ul>
                        <li><h6><span><Icon icon={bxBookReader} /></span><br />Full Course<br />Materials</h6></li>
                        <li><h6><span><Icon icon={certificate24Regular} /></span> <br /> Certified<br />Teachers</h6></li>
                        <li><h6><span><Icon icon={payment16Regular} /></span> <br /> Online<br />Payments</h6></li>
                        <li><h6><span><Icon icon={puzzleEditOutline} /></span> <br /> Creative<br />Lessons</h6></li>
                    </ul>
                </div>
            </section>
            <img src={slide2} alt="slide2" width="100%" />
            <section className="banner">
                <div className="best-panel">
                    <ul>
                        <li className="li33"><h2> <span>The Best</span> Panel</h2></li>
                        <li className="li67"><p>eTutor brings you the best online education experience <br /> to your finger tips by collaborating with <br /> leading teachers and lecturers in the country.</p></li>
                    </ul>
                </div>
            </section>
            <img src={slide3} alt="slide3" width="100%" />
            <section className="banner">
                <div className="best-panel">
                    <ul>
                        <li className="li33"><h2><span>Stay Ahead,</span> <br /> Always...</h2></li>
                        <li className="li67"><p>With all the knowledge provided, our students can <br /> stay ahead of the competition with ease.</p></li>
                    </ul>
                </div>
            </section>
            <section className="banner">
                <img src={slide4} alt="slide4" width="100%" />
                <div className="topstars">
                    <h2>Top Stars</h2>
                    <p>Our course content is created by <br /> a well - recognized academic staff, <br /> which guarantees the accuracy <br /> and the relevance.</p>
                </div>
            </section>
            <div>
                <table className="table1">
                    <tr className="counters-list-numbers">
                        <th>77</th>
                        <th>2500</th>
                        <th>48</th>
                        <th>225</th>
                    </tr>
                    <tr className="counters-list-titles">
                        <td>Certified<br />Teachers</td>
                        <td>Students</td>
                        <td>Subjects</td>
                        <td>Courses</td>
                    </tr>
                </table>
            </div>
            <section className="banner">
                <img src={slide5} alt="slide5" width="100%" />
                <div className="extracurricular">
                    <h2>Extracurricular Activities</h2>
                    <p>Here in E-Tutor, we offer a variety <br /> of non-academic activities to improve <br /> the educational environment of the students.</p>
                </div>
            </section>
            <section className="banner">
                <div className="top-courses">
                    <h2>Top Courses</h2>
                    <p>There are different varieties of courses available. Courses serve a multitude of <br /> purposes for different students: they are sometimes used to bridge the gap <br /> between different phases of academic study.</p>
                </div>
            </section>
            <section className="banner">
                <div className="courses-list">
                    <ul>
                        <li><img src={chemistry} alt="chemistry" width="100%" /> <br /> <h4>Chemistry</h4></li>
                        <li><img src={mathematics} alt="mathematics" width="100%" /> <br /> <h4>Combined Maths</h4></li>
                        <li><img src={physics} alt="physics" width="100%" /> <br /> <h4>Physics</h4></li>
                        <li><img src={biology} alt="biology" width="100%" /> <br /> <h4>Biology</h4></li>
                    </ul>
                </div>
            </section>
            <div className="quote">
                <h2>“An investment in knowledge <br /> pays the best interest...” </h2>
                <h6>-Benjamin Franklin - </h6>
            </div>
            <script src="./sandbox.js"></script>
        </main>
    );
}

export default HomeNew;