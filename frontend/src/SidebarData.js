import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PaymentIcon from '@material-ui/icons/Payment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import FeedbackIcon from '@material-ui/icons/Feedback';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/adminHome"
    },
    {
        title: "Courses",
        icon: <SchoolIcon/>,
        link: "/courses"
    },
    {
        title: "Users",
        icon: <GroupAddIcon/>,
        link: "/users"
    },
    {
        title: "Payments",
        icon: <PaymentIcon/>,
        link: "/payments"
    },
    {
        title: "Announcements",
        icon: <AddAlertIcon/>,
        link: "/announcements"
    },
    {
        title: "feedback",
        icon: <FeedbackIcon/>,
        link: "/feedback"
    },
]

