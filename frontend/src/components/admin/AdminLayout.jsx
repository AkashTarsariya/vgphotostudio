import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  Package,
  MessageSquare,
  Star,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/projects", label: "Projects", icon: FolderOpen },
  { to: "/admin/services", label: "Services", icon: Package },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 flex">
      {/* <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}> */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50
  transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="font-display text-lg tracking-widest">VG ADMIN</h1>
          <p className="text-gray-500 text-xs mt-1">{user?.email}</p>
        </div>
        <nav className="p-4 space-y-1">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-b border-gray-800"> */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full text-sm"
          >
            <LogOut size={22} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* <div className="flex-1 flex flex-col min-w-0"> */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-display text-sm tracking-widest">VG ADMIN</span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} className="opacity-0" />
          </button>
        </header>
        {/* <main className="flex-1 p-6 lg:p-8 overflow-auto"> */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
