import { Icon } from "@iconify/react";
import foodCake16Filled from "@iconify/icons-fluent/food-cake-16-filled";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Notification",
    path: "/dashboard",
    icon: (
      <img style={{ height: 22, width: 22 }} src="images/notification.png" />
    ),
  },
  {
    title: "Appointment",
    path: "/appointment",
    icon: <img style={{ height: 22, width: 22 }} src="images/schedule.png" />,
  },
  {
    title: "Note",
    path: "/daybusy",
    icon: <img style={{ height: 22, width: 22 }} src="images/booking.png" />,
  },
];

export default sidebarConfig;
