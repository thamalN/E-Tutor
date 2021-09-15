import Navbar from './Navbar';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';

import AdminHome from './Admin/AdminHome';
import Home from './Home';
import CreateAnnouncement from './Admin/CreateAnnouncement';
import CreateTeacherAcc from './Admin/CreateTeacherAcc';
import CreateSupStaffAcc from './Admin/CreateSupStaffAcc';
import Registrations from './Admin/Registrations';
import AdCourses from './Admin/AdCourses';
import TeacherHome from './Teacher/TeacherHome';
// import StuEvent from './'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import React, { useState } from 'react';


import './Resources/styles.css';
import './Resources/payment.css';
import Courses from './Teacher/Courses';
import CourseDetails from './Teacher/CourseDetails';
import AllCourses from './Admin/AllCourses';
import UserAccounts from './Admin/UserAccounts';
import Payments from './Admin/Payments';
import ManagePayments from './ManagePayments';
import PendingReceipts from './PendingReceipts';
import AddContent from './Teacher/AddContent';
import Announcements from './Admin/Announcements';
import ViewPreviousAnnouncements from './Admin/ViewPreviousAnnouncements';
import StudentHome from './Student/StudentHome';
import ViewCourses from './Student/ViewCourses';
import MyCourses from './Student/MyCourses';
import StudentAddAssigment from './Student/StudentAddAssigment';
import HomeNew from './HomeNew';
import Footer from './Footer.js';
import MyCourseDetails from './Student/MyCourseDetails';
import AddQuiz from './Teacher/AddQuiz';
import TeacherQuiz from './Teacher/TeacherQuiz';
import TeacherQuizEdit from './Teacher/TeacherQuizEdit';
import AddNewCourse from './Admin/AddNewCourse';
import RecentRegistrations from './Admin/RecentRegistrations';
import VerifiedPayments from './VerifiedPayments'
import StudentNotification from './Student/StudentNotification';
import StudentPayment from './Student/StudentPayment';
import StudentPayslip from './Student/StudentPayslip';
import StudentDetails from './Student/StudentDetails';
import ViewStuCourses from './Student/ViewStuCourses';
// import StuQuiz from './Student/StuQuiz';
import FeedbackReply from './Admin/FeedbackReply';
import Feedback from './Admin/Feedback';
import RejectedPayments from './RejectedPayments';
import AddDiscussion from './Teacher/AddDiscussion';
import Discussion from './Teacher/Discussion';
import StudentAddContent from './Student/StudentAddAssigment';
import TeacherPayments from './Admin/TeacherPayments';
import EditAnnouncement from './Admin/EditAnnouncement';
import Reports from './Admin/Reports';
import AllStudents from './Admin/AllStudents';
import AllTeachers from './Admin/AllTeachers';
import AllStaff from './Admin/AllStaff';
import AllCoursesList from './Admin/AllCoursesList';
import CoursePayments from './Admin/CoursePayments';
import PayCourses from './Student/PayCourses';
import Meeting from './Teacher/Meeting';
// import StuEvent from './Student/StuEvent';
// import StuAddQuiz from './Student/StuAddQuiz';
import StuFeedback from './Student/StuFeedback';
import DetailedTeacherPayments from './Admin/DetailedTeacherPayments';
// import StuAddQuiz from './Student/StuAddQuiz';
import TeacherAnnonucements from './Teacher/TeacherAnnouncements';
import CreateTeacherAnnouncement from './Teacher/CreateTeacherAnnouncement';
import ViewTeacherAnnouncements from './Teacher/ViewTeacherAnnouncements';
import EditTeacherAnnouncement from './Teacher/EditTeacherAnnouncement';
import TeacherFeedback from './Teacher/TeacherFeedback';
import Students from './Teacher/Students';
import EditContent from './Teacher/EditContent';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
import RecentStaffRegistrations from './SupportingStaff/RecentStaffRegistrations';
import StaffManagePayments from './SupportingStaff/StaffManagePayments';
import StaffReports from './SupportingStaff/StaffReports';
import StaffAllStudents from './SupportingStaff/StaffAllstudents';
import StaffAllTeachers from './SupportingStaff/StaffAllTeachers';
import StaffAllCourses from './SupportingStaff/StaffAllCourses';
import SupportingStaffHome from './SupportingStaff/SupportingStaffHome';
import StudentRegistrations from './SupportingStaff/StudentRegistrations';
import StudentAccounts from './SupportingStaff/StudentAccounts';
import SearchToUpdate from './SupportingStaff/SearchToUpdate';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
        <Navbar loggedIn = { loggedIn } setLoggedIn = { setLoggedIn }/>

        <div className="content">
          <Switch> 
            <Route exact path="/">
              <HomeNew />
            </Route>

            <Route exact path="/signIn">
              <SignIn setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route exact path="/signUp">
              <SignUp />
            </Route>

            <Route exact path="/viewProfile/">
              <ViewProfile />
            </Route>

            <Route exact path="/editProfile/">
              <EditProfile />
            </Route>

            <Route exact path="/adminHome/dashboard">
              <AdminHome setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route exact path="/adminHome/createTeacherAcc">
              <CreateTeacherAcc />
            </Route>

            <Route exact path="/adminHome/createSupStaffAcc">
              <CreateSupStaffAcc />
            </Route>

            <Route exact path="/adminHome/createAnnouncement">
              <CreateAnnouncement />
            </Route>

            <Route exact path="/adminHome/registrations">
              <Registrations />
            </Route>
            
            <Route exact path="/adminHome/courses">
              <AdCourses />
            </Route>

            <Route exact path="/adminHome/courses/allCourses">
              <AllCourses />
            </Route>

            <Route exact path="/adminHome/courses/addNewCourse">
              <AddNewCourse />
            </Route>

            <Route exact path="/adminHome/userAccounts">
              <UserAccounts />
            </Route>

            <Route exact path="/adminHome/payments">
              <Payments/>
            </Route>

            <Route exact path="/adminHome/payments/teacherPayments">
              <TeacherPayments/>
            </Route>

            <Route exact path="/adminHome/payments/teacherPayments/detailedTeacherPayments">
              <DetailedTeacherPayments />
            </Route>

            <Route exact path="/adminHome/announcements">
              <Announcements/>
            </Route>

            <Route exact path="/adminHome/registrations/recentRegistrations">
              <RecentRegistrations/>
            </Route>

            <Route exact path="/adminHome/announcements/viewPreviousAnnouncements">
              <ViewPreviousAnnouncements/>
            </Route>

            <Route exact path="/adminHome/announcements/editAnnouncement">
              <EditAnnouncement/>
            </Route>

            <Route exact path="/adminHome/viewFeedback">
              <Feedback/>
            </Route>

            <Route exact path="/adminHome/feedback/reply/:feedback_id">
              <FeedbackReply/>
            </Route>
            
            <Route exact path="/adminHome/reports">
              <Reports/>
            </Route>

            <Route exact path="/adminHome/reports/allStudents">
              <AllStudents/>
            </Route>

            <Route exact path="/adminHome/reports/allTeachers">
              <AllTeachers/>
            </Route>

            <Route exact path="/adminHome/reports/allStaff">
              <AllStaff/>
            </Route>

            <Route exact path="/adminHome/reports/allCoursesList">
              <AllCoursesList/>
            </Route>

            <Route exact path="/adminHome/reports/coursePayments">
              <CoursePayments/>
            </Route>

            <Route exact path="/supportingStaffHome/dashboard">
              <SupportingStaffHome setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route exact path="/supportingStaffHome/registrations">
              <StudentRegistrations/>
            </Route>

            <Route exact path="/supportingStaffHome/studentAccounts">
              <StudentAccounts />
            </Route>
            
            <Route exact path="/supportingStaffHome/searchToUpdate">
              <SearchToUpdate />
            </Route>

            <Route exact path="/supportingStaffHome/registrations/recentStaffRegistrations">
              <RecentStaffRegistrations/>
            </Route>

            <Route exact path="/supportingStaffHome/ManagePayments">
              <StaffManagePayments/>
            </Route>

            <Route exact path="/supportingStaffHome/reports">
              <StaffReports/>
            </Route>

            <Route exact path="/supportingStaffHome/reports/allStudents">
              <StaffAllStudents/>
            </Route>

            <Route exact path="/supportingStaffHome/reports/allTeachers">
              <StaffAllTeachers/>
            </Route>

            <Route exact path="/supportingStaffHome/reports/allCoursesList">
              <StaffAllCourses/>
            </Route>

            <Route exact path="/managePayments">
              <ManagePayments />
            </Route>

            <Route exact path="/pendingReceipts">
              <PendingReceipts />
            </Route>

            <Route exact path="/verifiedPayments">
              <VerifiedPayments />
            </Route>

            <Route exact path="/rejectedPayments">
              <RejectedPayments />
              </Route>
              
            <Route exact path="/teacher/teacherHome">
              <TeacherHome setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route exact path="/teacher/courses">
              <Courses />
            </Route>

            <Route exact path="/teacher/courses/:id">
              <CourseDetails />
            </Route>

            <Route exact path="/teacher/addContent">
              <AddContent />
            </Route>

            <Route exact path="/teacher/editContent">
              <EditContent />
            </Route>

            <Route exact path="/teacher/addQuiz">
              <AddQuiz />
            </Route>

            <Route exact path="/teacher/courses/quiz/:id">
              <TeacherQuiz />
            </Route>
            
            <Route exact path="/teacher/courses/quiz/:id/edit">
              <TeacherQuizEdit />
            </Route>

            <Route exact path="/teacher/addDiscussion">
              <AddDiscussion />
            </Route>

            <Route exact path="/teacher/courses/discussion/:id">
              <Discussion />
            </Route>

            <Route exact path="/teacher/meeting">
              <Meeting />
            </Route>

            <Route exact path="/teacher/students">
              <Students />
            </Route>

            <Route exact path="/teacher/announcements">
              <TeacherAnnonucements />
            </Route>

            <Route exact path="/teacher/announcements/createAnnouncement">
              <CreateTeacherAnnouncement />
            </Route>

            <Route exact path="/teacher/announcements/viewTeacherAnnouncements">
              <ViewTeacherAnnouncements />
            </Route>

            <Route exact path="/teacher/announcements/editAnnouncement">
              <EditTeacherAnnouncement />
            </Route>

            <Route exact path="/teacher/feedback">
              <TeacherFeedback/>
            </Route>

            <Route exact path="/studentHome">
              <StudentHome setLoggedIn = { setLoggedIn }/>
            </Route>

            <Route exact path="/studentHome/viewCourses">
              <ViewCourses />
            </Route>

            <Route exact path="/studentHome/myCourses">
              <MyCourses />
            </Route>

            <Route exact path="/studentHome/myCourses/:id">
              <MyCourseDetails />
            </Route>

            <Route exact path="/studentHome/notifications">
              <StudentNotification/>
            </Route>

            <Route exact path="/studentHome/payments">
              <StudentPayment/>
            </Route>

            <Route exact path="/studentHome/payments/payslip">
            <StudentPayslip/>
            </Route>

            <Route exact path="/studentHome/StudentAddAssigment">
            <StudentAddAssigment/>
            </Route>

            <Route exact path="/studentHome/StudentAddAssigment">
            <StudentAddAssigment/>
            </Route>
            
            <Route exact path="/studentHome/payments/payOnline">
            <PayCourses/>
            </Route>

            <Route exact path="/studentHome/StudentDetails/:id">
              <StudentDetails/>
            </Route>

            <Route exact path="/studentHome/StuFeedback">
              <StuFeedback/>
            </Route>

            {/* <Route exact path="/Student/StuQuiz">
              <StuQuiz />
            </Route> */}

            <Route exact path="/studentHome/ViewStuCourses">
              <ViewStuCourses/>
            </Route>


            {/* <Route exact path="/student/StuaddQuiz">
            <StuAddQuiz />
          </Route> */}
            
          </Switch>
        </div>
        {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;