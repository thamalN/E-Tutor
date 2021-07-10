import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PaymentIcon from '@material-ui/icons/Payment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import FeedbackIcon from '@material-ui/icons/Feedback';

export default function SidebarData() {
    const user = JSON.parse(localStorage.getItem('user'))

    let flag = user.user_flag

    if (flag === 1) {
        return [{ title: "Home", icon: <HomeIcon />, link: "/adminHome" },
        { title: "Courses", icon: <SchoolIcon />, link: "/courses" },
        { title: "Users", icon: <GroupAddIcon />, link: "/users" },
        { title: "Payments", icon: <PaymentIcon />, link: "/payments" },
        { title: "Announcements", icon: <AddAlertIcon />, link: "/announcements" },
        { title: "feedback", icon: <FeedbackIcon />, link: "/feedback" }
        ]

    } else if (flag === 3) {
        return [{ title: "Home", icon: <HomeIcon />, link: "/adminHome" },
        { title: "Courses", icon: <SchoolIcon />, link: "/courses" },
        { title: "Payments", icon: <PaymentIcon />, link: "/payments" },
        { title: "Announcements", icon: <AddAlertIcon />, link: "/announcements" },
        { title: "feedback", icon: <FeedbackIcon />, link: "/feedback" }
        ]
    }
}
