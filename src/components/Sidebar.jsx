import React from 'react'
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CirclePlus,
  List,
  CalendarCheck,
  MessageSquare,
  CreditCard,
  User,
} from "lucide-react";

const Sidebar = () => {
    const menuItems = [
  {
    label: "Dashboard",
    route: "/Userdashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Post Problem",
    route: "/Userdashboard/post-problem",
    icon: CirclePlus,
  },
  {
    label: "My Requests",
    route: "/Userdashboard/my-requests",
    icon: List,
  },
  {
    label: "Bookings",
    route: "bookings",
    icon: CalendarCheck,
  },
  {
    label: "Messages",
    route: "messages",
    icon: MessageSquare,
    notification: true,
  },
  {
    label: "Payments",
    route: "payments",
    icon: CreditCard,
  },
];
 const navigate = useNavigate();
  return (
    <div className="sidebar">
  <div className="sidebar-title">Customer</div>

  {menuItems.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.label}
        className={`sidebar-link ${
          item.active ? "active" : ""
        }`}
        onClick={() => navigate(item.route)}
      >
        <Icon size={18} />

        <span>{item.label}</span>

        {item.notification && (
          <span className="notif-dot" />
        )}
      </div>
    );
  })}

  <div
    className="sidebar-link"
    style={{ marginTop: "auto" }}
    onClick={() => navigate("profile")}
  >
    <User size={18} />
    <span>Profile</span>
  </div>
</div>
  )
}

export default Sidebar
