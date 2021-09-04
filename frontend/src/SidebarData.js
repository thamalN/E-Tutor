import React from 'react'
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PaymentIcon from '@material-ui/icons/Payment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import NotificationsIcon from '@material-ui/icons/Notifications';

export default function SidebarData() {
    const user = JSON.parse(localStorage.getItem('user'))

    let flag = user.user_flag

    if (flag === 1) {
        return [
        { title: "Home", icon: <HomeIcon />, link: "/adminHome/dashboard" },
        { title: "Registrations", icon: <GroupAddIcon />, link: "/adminHome/registrations" },
        { title: "Courses", icon: <MenuBookIcon />, link: "/adminHome/courses" },
        { title: "User Accounts", icon: <PeopleIcon />, link: "/adminHome/userAccounts" },
        { title: "Payments", icon: <PaymentIcon />, link: "/adminHome/payments" },
        { title: "Announcements", icon: <AddAlertIcon />, link: "/adminHome/announcements" },
        { title: "Feedback", icon: <FeedbackIcon />, link: "/adminHome/viewFeedback" },
        { title: "Reports", icon: <DescriptionIcon />, link: "/reports" }
        
        ]

    } 
    else if (flag === 2) {
        return [
        { title: "Home", icon: <HomeIcon />, link: "/supportingStaffHome" },
        { title: "Registrations", icon: <GroupAddIcon />, link: "/supportingStaffHome/registrations" },
        { title: "Student Accounts", icon: <PeopleIcon />, link: "/supportingStaffHome/studentAccounts" },
        { title: "Payments", icon: <PaymentIcon />, link: "/supportingStaffHome/managePayments" },
        { title: "Emails", icon: <EmailIcon />, link: "/emails" },
        { title: "Notifications", icon: <NotificationsIcon />, link: "/notifications" },
        { title: "Reports", icon: <DescriptionIcon />, link: "/reports" }
        ]
    }
    
    else if (flag === 3) {
        return [
        { title: "Home", icon: <HomeIcon />, link: "/teacher/teacherHome" },
        { title: "Courses", icon: <MenuBookIcon />, link: "/teacher/courses" },
        { title: "Payments", icon: <PaymentIcon />, link: "/payments" },
        { title: "Announcements", icon: <AddAlertIcon />, link: "/announcements" },
        { title: "Feedback", icon: <FeedbackIcon />, link: "/feedback" }
        ]
    }
    else if (flag === 4) {
        return [
        { title: "Home", icon: <HomeIcon />, link: "/studentHome" },
        { title: "Courses", icon: <SchoolIcon />, link: "/studentHome/viewCourses" },
        { title: "My Courses", icon: <SchoolIcon />, link: "/studentHome/myCourses" },
        { title: "Payments", icon: <PaymentIcon />, link: "/studentHome/payments" },
        { title: "Emails", icon: <EmailIcon />, link: "/emails" },
        { title: "Notifications", icon: <NotificationsIcon />, link: "/studentHome/notifications" },
        { title: "Events", icon: <DescriptionIcon />, link: "/studentHome/StuEvent" }
        ]
    }
}
