import React from 'react'
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Map,
  DollarSign,
  Star,
  Badge
} from "lucide-react";

const ProviderSidebar = () => {
    const menuItems = [
  {
    label: "Dashboard",
    route: "/provider-dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Near By",
    route: "/provider-dashboard/near-by",
    icon: Map,
  },
   {
    label: "My Jobs",
    route: "/provider-dashboard/review",
    icon: Badge,
  },
  {
    label: "Rewards",
    route: "/provider-dashboard/earning",
    icon: DollarSign,
  },
  {
    label: "Review",
    route: "/provider-dashboard/review",
    icon: Star,
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

 
</div>
  )
}

export default ProviderSidebar
