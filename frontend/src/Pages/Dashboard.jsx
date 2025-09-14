import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar"; // Your existing navbar component
import Kawhi from '../assets/Kawhi.jpg';
import '../Styles/Dashboard.css';

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus,
  IconPlus,
  IconReport,
  IconSettings
} from '@tabler/icons-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 7,
    active: 6,
    graduated: 1,
    dropped: 0,
  });

  const [user, setUser] = useState({ name: "Admin" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ name: payload.name || "Admin" });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/students");
        const students = res.data;

        const total = students.length;
        const active = students.filter(s => s.status === "Active").length;
        const graduated = students.filter(s => s.status === "Graduated").length;
        const dropped = students.filter(s => s.status === "Dropped" || s.status === "Inactive").length;

        setStats({ total, active, graduated, dropped });
      } catch (error) {
        console.error("Error fetching student stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Prepare data for StatsGrid component
  const statsData = [
    { title: 'Total Students', icon: 'user', value: stats.total.toString(), diff: 12 },
    { title: 'Active Students', icon: 'receipt', value: stats.active.toString(), diff: 19 },
    { title: 'Graduated', icon: 'coin', value: stats.graduated.toString(), diff: -4 },
    { title: 'Dropped/Inactive', icon: 'discount', value: stats.dropped.toString(), diff: -8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
  
      <div className="flex flex-col items-center justify-center px-4 py-8 h-screen">
                  <img 
              src={Kawhi} 
              alt="admin"  
              className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl border-4 border-white object-cover hover:scale-105 transition-transform duration-300"
            />
        {/* Header */}
        <div className="w-full max-w-6xl mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}. Here's an overview of your student management.
          </p>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-6xl mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Student Statistics</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {statsData.map((stat) => (
              <StatCard key={stat.title} data={stat} />
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <ActionCard 
              icon={<IconPlus size={24} />} 
              title="Add Student" 
              description="Register new student" 
              link="/students/add"
            />
            <ActionCard 
              icon={<IconReport size={24} />} 
              title="View Students" 
              description="View students" 
              link="/students"
            />
            <ActionCard 
              icon={<IconSettings size={24} />} 
              title="Manage" 
              description="manage students" 
              link="/students/manage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ data }) {
  const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
  };

  const Icon = icons[data.icon];
  const DiffIcon = data.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
  const diffColor = data.diff > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow w-64">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {data.title}
        </span>
        <Icon size={20} className="text-gray-400" />
      </div>
      
      <div className="flex items-end mb-2">
        <span className="text-3xl font-bold text-gray-900 mr-2">{data.value}</span>
        <div className={`flex items-center text-sm font-medium ${diffColor} mb-1`}>
          <span>{data.diff > 0 ? '+' : ''}{data.diff}%</span>
          <DiffIcon size={16} className="ml-1" />
        </div>
      </div>
      
      <p className="text-xs text-gray-500">Compared to previous month</p>
    </div>
  );
}

// ActionCard Component
function ActionCard({ icon, title, description, link }) {
  return (
    <a 
      href={link} 
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 flex items-start w-80"
    >
      <div className="bg-blue-100 p-3 rounded-lg mr-4 text-blue-600">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </a>
  );
}