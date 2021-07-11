import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PaymentIcon from '@material-ui/icons/Payment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import PersonIcon from '@material-ui/icons/Person';

export default function SidebarData() {
    const user = JSON.parse(localStorage.getItem('user'))

    let flag = user.user_flag

    if (flag === 1) {
        return [{ title: "Home", icon: <HomeIcon />, link: "/adminHome" },
        { title: "Courses", icon: <SchoolIcon />, link: "/courses" },
        { title: "Users", icon: <GroupAddIcon />, link: "/users", iconClosed: <ArrowDropDownIcon/>,
        iconClosed: <ArrowDropDownIcon/>,
        subNav: [
            {
                title: "Teachers",
                icon: <PersonIcon/>,
                link: "/users/teachers"
            },
            {
                title: "Supporting Staff",
                icon: <PersonIcon/>,
                link: "/users/supportingStaff"
            },
            {
                title: "Students",
                icon: <PersonIcon/>,
                link: "/users/students"
            }
        ] },
        { title: "Payments", icon: <PaymentIcon />, link: "/payments" },
        { title: "Announcements", icon: <AddAlertIcon />, link: "/announcements" },
        { title: "feedback", icon: <FeedbackIcon />, link: "/feedback" }
        ]

    } else if (flag === 3) {
        return [{ title: "Home", icon: <HomeIcon />, link: "/teacher/teacherHome" },
        { title: "Courses", icon: <SchoolIcon />, link: "/teacher/courses" },
        { title: "Payments", icon: <PaymentIcon />, link: "/payments" },
        { title: "Announcements", icon: <AddAlertIcon />, link: "/announcements" },
        { title: "Feedback", icon: <FeedbackIcon />, link: "/feedback" }
        ]
    }
}
