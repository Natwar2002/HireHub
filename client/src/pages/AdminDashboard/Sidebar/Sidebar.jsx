// Sidebar.jsx
import React, { useState } from "react"
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react"

export default function Sidebar({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen">
      <div
        className={`bg-slate-900 text-white transition-all duration-300 ease-in-out ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <span className="text-lg font-bold">HireHub</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex flex-col p-2 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={collapsed} />
          <SidebarItem icon={<Users size={20} />} label="Jobs" collapsed={collapsed} />
          <SidebarItem icon={<Settings size={20} />} label="Settings" collapsed={collapsed} />
        </nav>
      </div>


      <div className="w-full m-8">
        { children }
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, collapsed }) {
  return (
    <div
      className={`flex items-center p-2 rounded-md hover:bg-gray-800 cursor-pointer transition-colors ${
        collapsed ? "justify-center" : "gap-3"
      }`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </div>
  )
}
